package inmemory_reader

import (
	"example.com/m/reader"
)

type factory struct {
}

func (f *factory) New() reader.ReaderCloser {
	return &readerState{false}
}

type readerState struct {
  isClosed bool
}

func (rs *readerState) Read() <-chan string {
	data := []string{
		"country,latitude,longitude,name",
		"AD,42.546245,1.601554,Andorra",
		"AE,23.424076,53.847818,United Arab Emirates",
		"AF,33.93911,67.709953,Afghanistan",
	}

	ch := make(chan string)

	go func() {
		for _, d := range data {
			if rs.isClosed {
				close(ch)
				return
			}

			ch <- d
			// time.Sleep(2 * time.Second)
		}

		close(ch)
	}()

	return ch
}

func (rs *readerState) Close() {
	rs.isClosed = true
}

func init() {
	reader.Register(&factory{})
}
