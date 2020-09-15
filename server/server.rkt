#lang scratch

(require net/rfc6455)

(require net/rfc6455)
(ws-serve #:port 8081 (lambda (c s)
                        (let loop ()
                          (define data (ws-recv c))
                          (writeln data)
                          (unless (eof-object? data)
                            (ws-send! c data)
                            (loop)))))
(let loop () (loop))
