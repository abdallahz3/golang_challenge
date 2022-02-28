package file_reader

import (
	"bufio"
	"os"
	"time"

	"example.com/m/reader"
)

type factory struct {
}

func (fact *factory) New() reader.ReaderCloser {
	f, err := os.Open("data.csv")
	if err != nil {
		panic("cannot read file")
	}

	return &readerState{
		isClosed: false,
		file:     f,
	}
}

type readerState struct {
	isClosed bool
	file     *os.File
}

func (f *readerState) Read() <-chan string {
	ch := make(chan string)

	go func() {
		fileScanner := bufio.NewScanner(f.file)
		fileScanner.Split(bufio.ScanLines)

		for fileScanner.Scan() {
			if f.isClosed {
				break
			}

			ch <- fileScanner.Text()
			time.Sleep(1 * time.Second)
		}

		close(ch)
	}()

	return ch
}

func (f *readerState) Close() {
	f.isClosed = true
	f.file.Close()
}

func init() {
	reader.Register(&factory{})
}
