package reader

type ReaderCloser interface {
	Read() <-chan string
	Close()
}


type ReaderCloserFactory interface {
  New() ReaderCloser
}

var _readerCloserFactory ReaderCloserFactory = nil

func New() ReaderCloser {
	return  _readerCloserFactory.New()
}


func Register(rcf ReaderCloserFactory) {
  if (_readerCloserFactory != nil) {
    panic("A reader is already registered")
  }
  _readerCloserFactory = rcf
}
