### golang zap 自定义日志格式

### 目录结构

```tex
test_zap
├── go.mod
├── go.sum
├── log_mgr
│   ├── user_buffer.go
│   ├── user_encoder.go
│   ├── user_json_encoder.go
│   ├── user_mem_encoder.go
│   └── usr_define_logger.go
├── main.go
├── test.log
└── test_zap

```



main.go

```go
package main

import (
	"test_zap/log_mgr"

	"go.uber.org/zap"
)

func main() {
	log := log_mgr.GetLogger()
	zap_field := new(zap.Field)
	zap_field.Interface = map[string]string{
		"traceId": "123ewerfaskkljdasflkndsflkdflkasl",
	}
	log.Info("this is info message with fileds", *zap_field)
	log.Info("this is info message with fileds", zap.String("traceId", "111111111"))
	log.Info("this is info message with fileds", zap.String("traceId", "111111111"))
	log.Info("this is info message with fileds", zap.String("traceId", "111111111"))
	log.Info("this is info message with fileds", zap.String("traceId", "111111111"))

	// 我的诉求
	// 定义日志表示符号
	// 日志分割

}

```

usr_define_logger.go

```go
package log_mgr

import (
	"fmt"
	"os"
	"time"

	"go.uber.org/zap"
	"go.uber.org/zap/buffer"
	"go.uber.org/zap/zapcore"
)

func FieldsTransfer2Map(fields []zapcore.Field) map[string]string {
	resMap := make(map[string]string, len(fields))
	for _, v := range fields {
		resMap[v.Key] = v.String
	}
	return resMap
}

func (c consoleEncoder) EncodeEntry(ent zapcore.Entry, fields []zapcore.Field) (*buffer.Buffer, error) {
	line := UserGet()

	// We don't want the entry's metadata to be quoted and escaped (if it's
	// encoded as strings), which means that we can't use the JSON encoder. The
	// simplest option is to use the memory encoder and fmt.Fprint.
	//
	// If this ever becomes a performance bottleneck, we can implement
	// ArrayEncoder for our plain-text format.
	arr := getSliceEncoder()
	res := FieldsTransfer2Map(fields)
	if traceId, ok := res["traceId"]; ok {
		usr_str := fmt.Sprintf("%s|", traceId)
		line.AppendString(usr_str)
	}

	// 时间
	if c.TimeKey != "" && c.EncodeTime != nil {
		c.EncodeTime(ent.Time, arr)
	}

	// 日志级别标识
	if c.LevelKey != "" && c.EncodeLevel != nil {
		c.EncodeLevel(ent.Level, arr)
	}

	// 日志名称
	if ent.LoggerName != "" && c.NameKey != "" {
		nameEncoder := c.EncodeName

		if nameEncoder == nil {
			// Fall back to FullNameEncoder for backward compatibility.
			nameEncoder = zapcore.FullNameEncoder
		}

		nameEncoder(ent.LoggerName, arr)
	}

	// 调用位置信息
	if ent.Caller.Defined {
		if c.CallerKey != "" && c.EncodeCaller != nil {
			c.EncodeCaller(ent.Caller, arr)
		}
		if c.FunctionKey != "" {
			arr.AppendString(ent.Caller.Function)
		}
	}
	for i := range arr.elems {
		if i > 0 {
			line.AppendString(c.ConsoleSeparator)
		}
		fmt.Fprint(line, arr.elems[i])
	}
	putSliceEncoder(arr)

	// Add the message itself.
	if c.MessageKey != "" {
		c.addSeparatorIfNecessary(line)
		line.AppendString(ent.Message)
	}

	// 自定义的字段
	// c.writeContext(line, fields)

	// If there's no stacktrace key, honor that; this allows users to force
	// single-line output.
	if ent.Stack != "" && c.StacktraceKey != "" {
		line.AppendByte('\n')
		line.AppendString(ent.Stack)
	}

	line.AppendString(c.LineEnding)
	return line, nil
}

func MyISO8601TimeEncoder(t time.Time, enc zapcore.PrimitiveArrayEncoder) {
	encodeTimeLayout(t, "2006-01-02T15:04:05.000", enc)
}

func encodeTimeLayout(t time.Time, layout string, enc zapcore.PrimitiveArrayEncoder) {
	type appendTimeEncoder interface {
		AppendTimeLayout(time.Time, string)
	}

	if enc, ok := enc.(appendTimeEncoder); ok {
		enc.AppendTimeLayout(t, layout)
		return
	}

	enc.AppendString(t.Format(layout))
}

func GetLogger() *zap.Logger {
	// encoderConfig := zap.NewProductionEncoderConfig()
	// go.uber.org/zap/zapcore.EncoderConfig
	// {MessageKey: "msg", LevelKey: "level", TimeKey: "ts",
	// NameKey: "logger", CallerKey: "caller", FunctionKey: "",
	// StacktraceKey: "stacktrace", SkipLineEnding: false,
	// LineEnding: "\n", EncodeLevel: go.uber.org/zap/zapcore.LowercaseLevelEncoder,
	// EncodeTime: main.MyISO8601TimeEncoder,
	// EncodeDuration: go.uber.org/zap/zapcore.SecondsDurationEncoder,
	// EncodeCaller: go.uber.org/zap/zapcore.ShortCallerEncoder,
	// EncodeName: nil, NewReflectedEncoder: nil, ConsoleSeparator: "|"}
	// json.Encoder
	encoderConfig := zapcore.EncoderConfig{
		MessageKey:          "message",
		LevelKey:            "loglevel",
		TimeKey:             "time",
		NameKey:             "nameKey",
		CallerKey:           "caller",
		FunctionKey:         "functionKey",
		StacktraceKey:       "stacktraceKey",
		SkipLineEnding:      false,
		LineEnding:          "\n",
		EncodeLevel:         zapcore.CapitalLevelEncoder,
		EncodeTime:          MyISO8601TimeEncoder,
		EncodeDuration:      zapcore.SecondsDurationEncoder,
		EncodeCaller:        zapcore.ShortCallerEncoder,
		EncodeName:          nil,
		NewReflectedEncoder: nil,
		ConsoleSeparator:    "|",
	}
	// 设置日志记录中时间的格式
	encoderConfig.EncodeTime = MyISO8601TimeEncoder
	// 日志Encoder 还是JSONEncoder，把日志行格式化成JSON格式的
	// encoder := zapcore.NewJSONEncoder(encoderConfig)
	// encoderConfig.ConsoleSeparator = "|"
	encoder := NewConsoleEncoder(encoderConfig)
	// encoder := zapcore.NewConsoleEncoder(encoderConfig)
	file, _ := os.OpenFile("test.log", os.O_CREATE|os.O_APPEND|os.O_WRONLY, 0644)
	fileWriteSyncer := zapcore.AddSync(file)
	core := zapcore.NewTee(
		// 同时向控制台和文件写日志， 生产环境记得把控制台写入去掉，日志记录的基本是Debug 及以上，生产环境记得改成Info
		zapcore.NewCore(encoder, zapcore.AddSync(os.Stdout), zapcore.DebugLevel),
		zapcore.NewCore(encoder, fileWriteSyncer, zapcore.DebugLevel),
	)
	opts := []zap.Option{}
	opts = append(opts, zap.AddCaller())
	log := zap.New(core, opts...)
	return log
}
```





user_mem_encoder.go

```go
// Copyright (c) 2016 Uber Technologies, Inc.
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

package log_mgr

import (
	"sync"
	"time"

	"go.uber.org/zap/buffer"
	"go.uber.org/zap/zapcore"
)

// MapObjectEncoder is an ObjectEncoder backed by a simple
// map[string]interface{}. It's not fast enough for production use, but it's
// helpful in tests.
type MapObjectEncoder struct {
	// Fields contains the entire encoded log context.
	Fields map[string]interface{}
	// cur is a pointer to the namespace we're currently writing to.
	cur map[string]interface{}
}

// NewMapObjectEncoder creates a new map-backed ObjectEncoder.
func NewMapObjectEncoder() *MapObjectEncoder {
	m := make(map[string]interface{})
	return &MapObjectEncoder{
		Fields: m,
		cur:    m,
	}
}

// AddArray implements ObjectEncoder.
func (m *MapObjectEncoder) AddArray(key string, v zapcore.ArrayMarshaler) error {
	arr := &sliceArrayEncoder{elems: make([]interface{}, 0)}
	err := v.MarshalLogArray(arr)
	m.cur[key] = arr.elems
	return err
}

// AddObject implements ObjectEncoder.
func (m *MapObjectEncoder) AddObject(k string, v zapcore.ObjectMarshaler) error {
	newMap := NewMapObjectEncoder()
	m.cur[k] = newMap.Fields
	return v.MarshalLogObject(newMap)
}

// AddBinary implements ObjectEncoder.
func (m *MapObjectEncoder) AddBinary(k string, v []byte) { m.cur[k] = v }

// AddByteString implements ObjectEncoder.
func (m *MapObjectEncoder) AddByteString(k string, v []byte) { m.cur[k] = string(v) }

// AddBool implements ObjectEncoder.
func (m *MapObjectEncoder) AddBool(k string, v bool) { m.cur[k] = v }

// AddDuration implements ObjectEncoder.
func (m MapObjectEncoder) AddDuration(k string, v time.Duration) { m.cur[k] = v }

// AddComplex128 implements ObjectEncoder.
func (m *MapObjectEncoder) AddComplex128(k string, v complex128) { m.cur[k] = v }

// AddComplex64 implements ObjectEncoder.
func (m *MapObjectEncoder) AddComplex64(k string, v complex64) { m.cur[k] = v }

// AddFloat64 implements ObjectEncoder.
func (m *MapObjectEncoder) AddFloat64(k string, v float64) { m.cur[k] = v }

// AddFloat32 implements ObjectEncoder.
func (m *MapObjectEncoder) AddFloat32(k string, v float32) { m.cur[k] = v }

// AddInt implements ObjectEncoder.
func (m *MapObjectEncoder) AddInt(k string, v int) { m.cur[k] = v }

// AddInt64 implements ObjectEncoder.
func (m *MapObjectEncoder) AddInt64(k string, v int64) { m.cur[k] = v }

// AddInt32 implements ObjectEncoder.
func (m *MapObjectEncoder) AddInt32(k string, v int32) { m.cur[k] = v }

// AddInt16 implements ObjectEncoder.
func (m *MapObjectEncoder) AddInt16(k string, v int16) { m.cur[k] = v }

// AddInt8 implements ObjectEncoder.
func (m *MapObjectEncoder) AddInt8(k string, v int8) { m.cur[k] = v }

// AddString implements ObjectEncoder.
func (m *MapObjectEncoder) AddString(k string, v string) { m.cur[k] = v }

// AddTime implements ObjectEncoder.
func (m MapObjectEncoder) AddTime(k string, v time.Time) { m.cur[k] = v }

// AddUint implements ObjectEncoder.
func (m *MapObjectEncoder) AddUint(k string, v uint) { m.cur[k] = v }

// AddUint64 implements ObjectEncoder.
func (m *MapObjectEncoder) AddUint64(k string, v uint64) { m.cur[k] = v }

// AddUint32 implements ObjectEncoder.
func (m *MapObjectEncoder) AddUint32(k string, v uint32) { m.cur[k] = v }

// AddUint16 implements ObjectEncoder.
func (m *MapObjectEncoder) AddUint16(k string, v uint16) { m.cur[k] = v }

// AddUint8 implements ObjectEncoder.
func (m *MapObjectEncoder) AddUint8(k string, v uint8) { m.cur[k] = v }

// AddUintptr implements ObjectEncoder.
func (m *MapObjectEncoder) AddUintptr(k string, v uintptr) { m.cur[k] = v }

// AddReflected implements ObjectEncoder.
func (m *MapObjectEncoder) AddReflected(k string, v interface{}) error {
	m.cur[k] = v
	return nil
}

// OpenNamespace implements ObjectEncoder.
func (m *MapObjectEncoder) OpenNamespace(k string) {
	ns := make(map[string]interface{})
	m.cur[k] = ns
	m.cur = ns
}

// sliceArrayEncoder is an ArrayEncoder backed by a simple []interface{}. Like
// the MapObjectEncoder, it's not designed for production use.
type sliceArrayEncoder struct {
	elems []interface{}
}

func (s *sliceArrayEncoder) AppendArray(v zapcore.ArrayMarshaler) error {
	enc := &sliceArrayEncoder{}
	err := v.MarshalLogArray(enc)
	s.elems = append(s.elems, enc.elems)
	return err
}

func (s *sliceArrayEncoder) AppendObject(v zapcore.ObjectMarshaler) error {
	m := NewMapObjectEncoder()
	err := v.MarshalLogObject(m)
	s.elems = append(s.elems, m.Fields)
	return err
}

func (s *sliceArrayEncoder) AppendReflected(v interface{}) error {
	s.elems = append(s.elems, v)
	return nil
}

func (s *sliceArrayEncoder) AppendBool(v bool)              { s.elems = append(s.elems, v) }
func (s *sliceArrayEncoder) AppendByteString(v []byte)      { s.elems = append(s.elems, string(v)) }
func (s *sliceArrayEncoder) AppendComplex128(v complex128)  { s.elems = append(s.elems, v) }
func (s *sliceArrayEncoder) AppendComplex64(v complex64)    { s.elems = append(s.elems, v) }
func (s *sliceArrayEncoder) AppendDuration(v time.Duration) { s.elems = append(s.elems, v) }
func (s *sliceArrayEncoder) AppendFloat64(v float64)        { s.elems = append(s.elems, v) }
func (s *sliceArrayEncoder) AppendFloat32(v float32)        { s.elems = append(s.elems, v) }
func (s *sliceArrayEncoder) AppendInt(v int)                { s.elems = append(s.elems, v) }
func (s *sliceArrayEncoder) AppendInt64(v int64)            { s.elems = append(s.elems, v) }
func (s *sliceArrayEncoder) AppendInt32(v int32)            { s.elems = append(s.elems, v) }
func (s *sliceArrayEncoder) AppendInt16(v int16)            { s.elems = append(s.elems, v) }
func (s *sliceArrayEncoder) AppendInt8(v int8)              { s.elems = append(s.elems, v) }
func (s *sliceArrayEncoder) AppendString(v string)          { s.elems = append(s.elems, v) }
func (s *sliceArrayEncoder) AppendTime(v time.Time)         { s.elems = append(s.elems, v) }
func (s *sliceArrayEncoder) AppendUint(v uint)              { s.elems = append(s.elems, v) }
func (s *sliceArrayEncoder) AppendUint64(v uint64)          { s.elems = append(s.elems, v) }
func (s *sliceArrayEncoder) AppendUint32(v uint32)          { s.elems = append(s.elems, v) }
func (s *sliceArrayEncoder) AppendUint16(v uint16)          { s.elems = append(s.elems, v) }
func (s *sliceArrayEncoder) AppendUint8(v uint8)            { s.elems = append(s.elems, v) }
func (s *sliceArrayEncoder) AppendUintptr(v uintptr)        { s.elems = append(s.elems, v) }

// A Pool is a type-safe wrapper around a sync.Pool.
type Pool struct {
	p *sync.Pool
}

// NewPool constructs a new Pool.
func NewPool() Pool {
	return Pool{p: &sync.Pool{
		New: func() interface{} {
			return &Buffer{bs: make([]byte, 0, _size)}
		},
	}}
}

// Get retrieves a Buffer from the pool, creating one if necessary.
func (p Pool) Get() *Buffer {
	buf := p.p.Get().(*Buffer)
	buf.Reset()
	buf.pool = p
	return buf
}

func (p Pool) put(buf *Buffer) {
	p.p.Put(buf)
}

var (
	_pool = buffer.NewPool()
	// UserGet retrieves a buffer from the pool, creating one if necessary.
	UserGet = _pool.Get
)

func addFields(enc zapcore.ObjectEncoder, fields []zapcore.Field) {
	for i := range fields {
		fields[i].AddTo(enc)
	}
}
```



user_json_encoder.go

```go
package log_mgr

// Copyright (c) 2016 Uber Technologies, Inc.
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

import (
	"encoding/base64"
	"math"
	"sync"
	"time"
	"unicode/utf8"

	"encoding/json"
	"io"

	"go.uber.org/zap/buffer"
	"go.uber.org/zap/zapcore"
)

// ReflectedEncoder serializes log fields that can't be serialized with Zap's
// JSON encoder. These have the ReflectType field type.
// Use EncoderConfig.NewReflectedEncoder to set this.
type ReflectedEncoder interface {
	// Encode encodes and writes to the underlying data stream.
	Encode(interface{}) error
}

func defaultReflectedEncoder(w io.Writer) zapcore.ReflectedEncoder {
	enc := json.NewEncoder(w)
	// For consistency with our custom JSON encoder.
	enc.SetEscapeHTML(false)
	return enc
}

// For JSON-escaping; see jsonEncoder.safeAddString below.
const _hex = "0123456789abcdef"

var _jsonPool = sync.Pool{New: func() interface{} {
	return &jsonEncoder{}
}}

func getJSONEncoder() *jsonEncoder {
	return _jsonPool.Get().(*jsonEncoder)
}

func putJSONEncoder(enc *jsonEncoder) {
	if enc.reflectBuf != nil {
		enc.reflectBuf.Free()
	}
	enc.EncoderConfig = nil
	enc.buf = nil
	enc.spaced = false
	enc.openNamespaces = 0
	enc.reflectBuf = nil
	enc.reflectEnc = nil
	_jsonPool.Put(enc)
}

type jsonEncoder struct {
	*zapcore.EncoderConfig
	buf            *buffer.Buffer
	spaced         bool // include spaces after colons and commas
	openNamespaces int

	// for encoding generic values by reflection
	reflectBuf *buffer.Buffer
	reflectEnc zapcore.ReflectedEncoder
}

// NewJSONEncoder creates a fast, low-allocation JSON encoder. The encoder
// appropriately escapes all field keys and values.
//
// Note that the encoder doesn't deduplicate keys, so it's possible to produce
// a message like
//   {"foo":"bar","foo":"baz"}
// This is permitted by the JSON specification, but not encouraged. Many
// libraries will ignore duplicate key-value pairs (typically keeping the last
// pair) when unmarshaling, but users should attempt to avoid adding duplicate
// keys.
func NewJSONEncoder(cfg zapcore.EncoderConfig) zapcore.Encoder {
	return newJSONEncoder(cfg, false)
}

func newJSONEncoder(cfg zapcore.EncoderConfig, spaced bool) *jsonEncoder {
	if cfg.SkipLineEnding {
		cfg.LineEnding = ""
	} else if cfg.LineEnding == "" {
		cfg.LineEnding = zapcore.DefaultLineEnding
	}

	// If no EncoderConfig.NewReflectedEncoder is provided by the user, then use default
	if cfg.NewReflectedEncoder == nil {
		cfg.NewReflectedEncoder = defaultReflectedEncoder
	}

	return &jsonEncoder{
		EncoderConfig: &cfg,
		buf:           UserGet(),
		spaced:        spaced,
	}
}

func (enc *jsonEncoder) AddArray(key string, arr zapcore.ArrayMarshaler) error {
	enc.addKey(key)
	return enc.AppendArray(arr)
}

func (enc *jsonEncoder) AddObject(key string, obj zapcore.ObjectMarshaler) error {
	enc.addKey(key)
	return enc.AppendObject(obj)
}

func (enc *jsonEncoder) AddBinary(key string, val []byte) {
	enc.AddString(key, base64.StdEncoding.EncodeToString(val))
}

func (enc *jsonEncoder) AddByteString(key string, val []byte) {
	enc.addKey(key)
	enc.AppendByteString(val)
}

func (enc *jsonEncoder) AddBool(key string, val bool) {
	enc.addKey(key)
	enc.AppendBool(val)
}

func (enc *jsonEncoder) AddComplex128(key string, val complex128) {
	enc.addKey(key)
	enc.AppendComplex128(val)
}

func (enc *jsonEncoder) AddComplex64(key string, val complex64) {
	enc.addKey(key)
	enc.AppendComplex64(val)
}

func (enc *jsonEncoder) AddDuration(key string, val time.Duration) {
	enc.addKey(key)
	enc.AppendDuration(val)
}

func (enc *jsonEncoder) AddFloat64(key string, val float64) {
	enc.addKey(key)
	enc.AppendFloat64(val)
}

func (enc *jsonEncoder) AddFloat32(key string, val float32) {
	enc.addKey(key)
	enc.AppendFloat32(val)
}

func (enc *jsonEncoder) AddInt64(key string, val int64) {
	enc.addKey(key)
	enc.AppendInt64(val)
}

func (enc *jsonEncoder) resetReflectBuf() {
	if enc.reflectBuf == nil {
		enc.reflectBuf = UserGet()
		enc.reflectEnc = enc.NewReflectedEncoder(enc.reflectBuf)
	} else {
		enc.reflectBuf.Reset()
	}
}

var nullLiteralBytes = []byte("null")

// Only invoke the standard JSON encoder if there is actually something to
// encode; otherwise write JSON null literal directly.
func (enc *jsonEncoder) encodeReflected(obj interface{}) ([]byte, error) {
	if obj == nil {
		return nullLiteralBytes, nil
	}
	enc.resetReflectBuf()
	if err := enc.reflectEnc.Encode(obj); err != nil {
		return nil, err
	}
	enc.reflectBuf.TrimNewline()
	return enc.reflectBuf.Bytes(), nil
}

func (enc *jsonEncoder) AddReflected(key string, obj interface{}) error {
	valueBytes, err := enc.encodeReflected(obj)
	if err != nil {
		return err
	}
	enc.addKey(key)
	_, err = enc.buf.Write(valueBytes)
	return err
}

func (enc *jsonEncoder) OpenNamespace(key string) {
	enc.addKey(key)
	enc.buf.AppendByte('{')
	enc.openNamespaces++
}

func (enc *jsonEncoder) AddString(key, val string) {
	enc.addKey(key)
	enc.AppendString(val)
}

func (enc *jsonEncoder) AddTime(key string, val time.Time) {
	enc.addKey(key)
	enc.AppendTime(val)
}

func (enc *jsonEncoder) AddUint64(key string, val uint64) {
	enc.addKey(key)
	enc.AppendUint64(val)
}

func (enc *jsonEncoder) AppendArray(arr zapcore.ArrayMarshaler) error {
	enc.addElementSeparator()
	enc.buf.AppendByte('[')
	err := arr.MarshalLogArray(enc)
	enc.buf.AppendByte(']')
	return err
}

func (enc *jsonEncoder) AppendObject(obj zapcore.ObjectMarshaler) error {
	// Close ONLY new openNamespaces that are created during
	// AppendObject().
	old := enc.openNamespaces
	enc.openNamespaces = 0
	enc.addElementSeparator()
	enc.buf.AppendByte('{')
	err := obj.MarshalLogObject(enc)
	enc.buf.AppendByte('}')
	enc.closeOpenNamespaces()
	enc.openNamespaces = old
	return err
}

func (enc *jsonEncoder) AppendBool(val bool) {
	enc.addElementSeparator()
	enc.buf.AppendBool(val)
}

func (enc *jsonEncoder) AppendByteString(val []byte) {
	enc.addElementSeparator()
	enc.buf.AppendByte('"')
	enc.safeAddByteString(val)
	enc.buf.AppendByte('"')
}

// appendComplex appends the encoded form of the provided complex128 value.
// precision specifies the encoding precision for the real and imaginary
// components of the complex number.
func (enc *jsonEncoder) appendComplex(val complex128, precision int) {
	enc.addElementSeparator()
	// Cast to a platform-independent, fixed-size type.
	r, i := float64(real(val)), float64(imag(val))
	enc.buf.AppendByte('"')
	// Because we're always in a quoted string, we can use strconv without
	// special-casing NaN and +/-Inf.
	enc.buf.AppendFloat(r, precision)
	// If imaginary part is less than 0, minus (-) sign is added by default
	// by AppendFloat.
	if i >= 0 {
		enc.buf.AppendByte('+')
	}
	enc.buf.AppendFloat(i, precision)
	enc.buf.AppendByte('i')
	enc.buf.AppendByte('"')
}

func (enc *jsonEncoder) AppendDuration(val time.Duration) {
	cur := enc.buf.Len()
	if e := enc.EncodeDuration; e != nil {
		e(val, enc)
	}
	if cur == enc.buf.Len() {
		// User-supplied EncodeDuration is a no-op. Fall back to nanoseconds to keep
		// JSON valid.
		enc.AppendInt64(int64(val))
	}
}

func (enc *jsonEncoder) AppendInt64(val int64) {
	enc.addElementSeparator()
	enc.buf.AppendInt(val)
}

func (enc *jsonEncoder) AppendReflected(val interface{}) error {
	valueBytes, err := enc.encodeReflected(val)
	if err != nil {
		return err
	}
	enc.addElementSeparator()
	_, err = enc.buf.Write(valueBytes)
	return err
}

func (enc *jsonEncoder) AppendString(val string) {
	enc.addElementSeparator()
	enc.buf.AppendByte('"')
	enc.safeAddString(val)
	enc.buf.AppendByte('"')
}

func (enc *jsonEncoder) AppendTimeLayout(time time.Time, layout string) {
	enc.addElementSeparator()
	enc.buf.AppendByte('"')
	enc.buf.AppendTime(time, layout)
	enc.buf.AppendByte('"')
}

func (enc *jsonEncoder) AppendTime(val time.Time) {
	cur := enc.buf.Len()
	if e := enc.EncodeTime; e != nil {
		e(val, enc)
	}
	if cur == enc.buf.Len() {
		// User-supplied EncodeTime is a no-op. Fall back to nanos since epoch to keep
		// output JSON valid.
		enc.AppendInt64(val.UnixNano())
	}
}

func (enc *jsonEncoder) AppendUint64(val uint64) {
	enc.addElementSeparator()
	enc.buf.AppendUint(val)
}

func (enc *jsonEncoder) AddInt(k string, v int)         { enc.AddInt64(k, int64(v)) }
func (enc *jsonEncoder) AddInt32(k string, v int32)     { enc.AddInt64(k, int64(v)) }
func (enc *jsonEncoder) AddInt16(k string, v int16)     { enc.AddInt64(k, int64(v)) }
func (enc *jsonEncoder) AddInt8(k string, v int8)       { enc.AddInt64(k, int64(v)) }
func (enc *jsonEncoder) AddUint(k string, v uint)       { enc.AddUint64(k, uint64(v)) }
func (enc *jsonEncoder) AddUint32(k string, v uint32)   { enc.AddUint64(k, uint64(v)) }
func (enc *jsonEncoder) AddUint16(k string, v uint16)   { enc.AddUint64(k, uint64(v)) }
func (enc *jsonEncoder) AddUint8(k string, v uint8)     { enc.AddUint64(k, uint64(v)) }
func (enc *jsonEncoder) AddUintptr(k string, v uintptr) { enc.AddUint64(k, uint64(v)) }
func (enc *jsonEncoder) AppendComplex64(v complex64)    { enc.appendComplex(complex128(v), 32) }
func (enc *jsonEncoder) AppendComplex128(v complex128)  { enc.appendComplex(complex128(v), 64) }
func (enc *jsonEncoder) AppendFloat64(v float64)        { enc.appendFloat(v, 64) }
func (enc *jsonEncoder) AppendFloat32(v float32)        { enc.appendFloat(float64(v), 32) }
func (enc *jsonEncoder) AppendInt(v int)                { enc.AppendInt64(int64(v)) }
func (enc *jsonEncoder) AppendInt32(v int32)            { enc.AppendInt64(int64(v)) }
func (enc *jsonEncoder) AppendInt16(v int16)            { enc.AppendInt64(int64(v)) }
func (enc *jsonEncoder) AppendInt8(v int8)              { enc.AppendInt64(int64(v)) }
func (enc *jsonEncoder) AppendUint(v uint)              { enc.AppendUint64(uint64(v)) }
func (enc *jsonEncoder) AppendUint32(v uint32)          { enc.AppendUint64(uint64(v)) }
func (enc *jsonEncoder) AppendUint16(v uint16)          { enc.AppendUint64(uint64(v)) }
func (enc *jsonEncoder) AppendUint8(v uint8)            { enc.AppendUint64(uint64(v)) }
func (enc *jsonEncoder) AppendUintptr(v uintptr)        { enc.AppendUint64(uint64(v)) }

func (enc *jsonEncoder) Clone() zapcore.Encoder {
	clone := enc.clone()
	clone.buf.Write(enc.buf.Bytes())
	return clone
}

func (enc *jsonEncoder) clone() *jsonEncoder {
	clone := getJSONEncoder()
	clone.EncoderConfig = enc.EncoderConfig
	clone.spaced = enc.spaced
	clone.openNamespaces = enc.openNamespaces
	clone.buf = UserGet()
	return clone
}

func (enc *jsonEncoder) EncodeEntry(ent zapcore.Entry, fields []zapcore.Field) (*buffer.Buffer, error) {
	final := enc.clone()
	final.buf.AppendByte('{')

	if final.LevelKey != "" && final.EncodeLevel != nil {
		final.addKey(final.LevelKey)
		cur := final.buf.Len()
		final.EncodeLevel(ent.Level, final)
		if cur == final.buf.Len() {
			// User-supplied EncodeLevel was a no-op. Fall back to strings to keep
			// output JSON valid.
			final.AppendString(ent.Level.String())
		}
	}
	if final.TimeKey != "" {
		final.AddTime(final.TimeKey, ent.Time)
	}
	if ent.LoggerName != "" && final.NameKey != "" {
		final.addKey(final.NameKey)
		cur := final.buf.Len()
		nameEncoder := final.EncodeName

		// if no name encoder provided, fall back to FullNameEncoder for backwards
		// compatibility
		if nameEncoder == nil {
			nameEncoder = zapcore.FullNameEncoder
		}

		nameEncoder(ent.LoggerName, final)
		if cur == final.buf.Len() {
			// User-supplied EncodeName was a no-op. Fall back to strings to
			// keep output JSON valid.
			final.AppendString(ent.LoggerName)
		}
	}
	if ent.Caller.Defined {
		if final.CallerKey != "" {
			final.addKey(final.CallerKey)
			cur := final.buf.Len()
			final.EncodeCaller(ent.Caller, final)
			if cur == final.buf.Len() {
				// User-supplied EncodeCaller was a no-op. Fall back to strings to
				// keep output JSON valid.
				final.AppendString(ent.Caller.String())
			}
		}
		if final.FunctionKey != "" {
			final.addKey(final.FunctionKey)
			final.AppendString(ent.Caller.Function)
		}
	}
	if final.MessageKey != "" {
		final.addKey(enc.MessageKey)
		final.AppendString(ent.Message)
	}
	if enc.buf.Len() > 0 {
		final.addElementSeparator()
		final.buf.Write(enc.buf.Bytes())
	}
	addFields(final, fields)
	final.closeOpenNamespaces()
	if ent.Stack != "" && final.StacktraceKey != "" {
		final.AddString(final.StacktraceKey, ent.Stack)
	}
	final.buf.AppendByte('}')
	final.buf.AppendString(final.LineEnding)

	ret := final.buf
	putJSONEncoder(final)
	return ret, nil
}

func (enc *jsonEncoder) closeOpenNamespaces() {
	for i := 0; i < enc.openNamespaces; i++ {
		enc.buf.AppendByte('}')
	}
	enc.openNamespaces = 0
}

func (enc *jsonEncoder) addKey(key string) {
	enc.addElementSeparator()
	enc.buf.AppendByte('"')
	enc.safeAddString(key)
	enc.buf.AppendByte('"')
	enc.buf.AppendByte(':')
	if enc.spaced {
		enc.buf.AppendByte(' ')
	}
}

func (enc *jsonEncoder) addElementSeparator() {
	last := enc.buf.Len() - 1
	if last < 0 {
		return
	}
	switch enc.buf.Bytes()[last] {
	case '{', '[', ':', ',', ' ':
		return
	default:
		enc.buf.AppendByte(',')
		if enc.spaced {
			enc.buf.AppendByte(' ')
		}
	}
}

func (enc *jsonEncoder) appendFloat(val float64, bitSize int) {
	enc.addElementSeparator()
	switch {
	case math.IsNaN(val):
		enc.buf.AppendString(`"NaN"`)
	case math.IsInf(val, 1):
		enc.buf.AppendString(`"+Inf"`)
	case math.IsInf(val, -1):
		enc.buf.AppendString(`"-Inf"`)
	default:
		enc.buf.AppendFloat(val, bitSize)
	}
}

// safeAddString JSON-escapes a string and appends it to the internal buffer.
// Unlike the standard library's encoder, it doesn't attempt to protect the
// user from browser vulnerabilities or JSONP-related problems.
func (enc *jsonEncoder) safeAddString(s string) {
	for i := 0; i < len(s); {
		if enc.tryAddRuneSelf(s[i]) {
			i++
			continue
		}
		r, size := utf8.DecodeRuneInString(s[i:])
		if enc.tryAddRuneError(r, size) {
			i++
			continue
		}
		enc.buf.AppendString(s[i : i+size])
		i += size
	}
}

// safeAddByteString is no-alloc equivalent of safeAddString(string(s)) for s []byte.
func (enc *jsonEncoder) safeAddByteString(s []byte) {
	for i := 0; i < len(s); {
		if enc.tryAddRuneSelf(s[i]) {
			i++
			continue
		}
		r, size := utf8.DecodeRune(s[i:])
		if enc.tryAddRuneError(r, size) {
			i++
			continue
		}
		enc.buf.Write(s[i : i+size])
		i += size
	}
}

// tryAddRuneSelf appends b if it is valid UTF-8 character represented in a single byte.
func (enc *jsonEncoder) tryAddRuneSelf(b byte) bool {
	if b >= utf8.RuneSelf {
		return false
	}
	if 0x20 <= b && b != '\\' && b != '"' {
		enc.buf.AppendByte(b)
		return true
	}
	switch b {
	case '\\', '"':
		enc.buf.AppendByte('\\')
		enc.buf.AppendByte(b)
	case '\n':
		enc.buf.AppendByte('\\')
		enc.buf.AppendByte('n')
	case '\r':
		enc.buf.AppendByte('\\')
		enc.buf.AppendByte('r')
	case '\t':
		enc.buf.AppendByte('\\')
		enc.buf.AppendByte('t')
	default:
		// Encode bytes < 0x20, except for the escape sequences above.
		enc.buf.AppendString(`\u00`)
		enc.buf.AppendByte(_hex[b>>4])
		enc.buf.AppendByte(_hex[b&0xF])
	}
	return true
}

func (enc *jsonEncoder) tryAddRuneError(r rune, size int) bool {
	if r == utf8.RuneError && size == 1 {
		enc.buf.AppendString(`\ufffd`)
		return true
	}
	return false
}
```





user_encoder.go

```go
package log_mgr

// Copyright (c) 2016 Uber Technologies, Inc.
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

import (
	"sync"

	"go.uber.org/zap/buffer"
	"go.uber.org/zap/zapcore"
)

var _sliceEncoderPool = sync.Pool{
	New: func() interface{} {
		return &sliceArrayEncoder{elems: make([]interface{}, 0, 2)}
	},
}

func getSliceEncoder() *sliceArrayEncoder {
	return _sliceEncoderPool.Get().(*sliceArrayEncoder)
}

func putSliceEncoder(e *sliceArrayEncoder) {
	e.elems = e.elems[:0]
	_sliceEncoderPool.Put(e)
}

type consoleEncoder struct {
	*jsonEncoder
}

// NewConsoleEncoder creates an encoder whose output is designed for human -
// rather than machine - consumption. It serializes the core log entry data
// (message, level, timestamp, etc.) in a plain-text format and leaves the
// structured context as JSON.
//
// Note that although the console encoder doesn't use the keys specified in the
// encoder configuration, it will omit any element whose key is set to the empty
// string.
func NewConsoleEncoder(cfg zapcore.EncoderConfig) zapcore.Encoder {
	if cfg.ConsoleSeparator == "" {
		// Use a default delimiter of '\t' for backwards compatibility
		cfg.ConsoleSeparator = "\t"
	}
	return consoleEncoder{newJSONEncoder(cfg, true)}
}

func (c consoleEncoder) Clone() zapcore.Encoder {
	return consoleEncoder{c.jsonEncoder.Clone().(*jsonEncoder)}
}

// func (c consoleEncoder) writeContext(line *buffer.Buffer, extra []zapcore.Field) {
// 	context := c.jsonEncoder.Clone().(*jsonEncoder)
// 	defer func() {
// 		// putJSONEncoder assumes the buffer is still used, but we write out the buffer so
// 		// we can free it.
// 		context.buf.Free()
// 		putJSONEncoder(context)
// 	}()

// 	addFields(context, extra)
// 	context.closeOpenNamespaces()
// 	if context.buf.Len() == 0 {
// 		return
// 	}

// 	c.addSeparatorIfNecessary(line)
// 	line.AppendByte('{')
// 	line.Write(context.buf.Bytes())
// 	line.AppendByte('}')
// }

func (c consoleEncoder) addSeparatorIfNecessary(line *buffer.Buffer) {
	if line.Len() > 0 {
		line.AppendString(c.ConsoleSeparator)
	}
}
```





user_buffer.go

```go
package log_mgr

import (
	"strconv"
	"time"
)

const _size = 1024 // by default, create 1 KiB buffers

// Buffer is a thin wrapper around a byte slice. It's intended to be pooled, so
// the only way to construct one is via a Pool.
type Buffer struct {
	bs   []byte
	pool Pool
}

// AppendByte writes a single byte to the Buffer.
func (b *Buffer) AppendByte(v byte) {
	b.bs = append(b.bs, v)
}

// AppendString writes a string to the Buffer.
func (b *Buffer) AppendString(s string) {
	b.bs = append(b.bs, s...)
}

// AppendInt appends an integer to the underlying buffer (assuming base 10).
func (b *Buffer) AppendInt(i int64) {
	b.bs = strconv.AppendInt(b.bs, i, 10)
}

// AppendTime appends the time formatted using the specified layout.
func (b *Buffer) AppendTime(t time.Time, layout string) {
	b.bs = t.AppendFormat(b.bs, layout)
}

// AppendUint appends an unsigned integer to the underlying buffer (assuming
// base 10).
func (b *Buffer) AppendUint(i uint64) {
	b.bs = strconv.AppendUint(b.bs, i, 10)
}

// AppendBool appends a bool to the underlying buffer.
func (b *Buffer) AppendBool(v bool) {
	b.bs = strconv.AppendBool(b.bs, v)
}

// AppendFloat appends a float to the underlying buffer. It doesn't quote NaN
// or +/- Inf.
func (b *Buffer) AppendFloat(f float64, bitSize int) {
	b.bs = strconv.AppendFloat(b.bs, f, 'f', -1, bitSize)
}

// Len returns the length of the underlying byte slice.
func (b *Buffer) Len() int {
	return len(b.bs)
}

// Cap returns the capacity of the underlying byte slice.
func (b *Buffer) Cap() int {
	return cap(b.bs)
}

// Bytes returns a mutable reference to the underlying byte slice.
func (b *Buffer) Bytes() []byte {
	return b.bs
}

// String returns a string copy of the underlying byte slice.
func (b *Buffer) String() string {
	return string(b.bs)
}

// Reset resets the underlying byte slice. Subsequent writes re-use the slice's
// backing array.
func (b *Buffer) Reset() {
	b.bs = b.bs[:0]
}

// Write implements io.Writer.
func (b *Buffer) Write(bs []byte) (int, error) {
	b.bs = append(b.bs, bs...)
	return len(bs), nil
}

// WriteByte writes a single byte to the Buffer.
//
// Error returned is always nil, function signature is compatible
// with bytes.Buffer and bufio.Writer
func (b *Buffer) WriteByte(v byte) error {
	b.AppendByte(v)
	return nil
}

// WriteString writes a string to the Buffer.
//
// Error returned is always nil, function signature is compatible
// with bytes.Buffer and bufio.Writer
func (b *Buffer) WriteString(s string) (int, error) {
	b.AppendString(s)
	return len(s), nil
}

// TrimNewline trims any final "\n" byte from the end of the buffer.
func (b *Buffer) TrimNewline() {
	if i := len(b.bs) - 1; i >= 0 {
		if b.bs[i] == '\n' {
			b.bs = b.bs[:i]
		}
	}
}

// Free returns the Buffer to its Pool.
//
// Callers must not retain references to the Buffer after calling Free.
func (b *Buffer) Free() {
	b.pool.put(b)
}
```

