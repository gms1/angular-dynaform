# NativeScript support and known issues

* innerHTML for labels not supported on Button, CheckBox,...

* updateOn: 'blur'
  * wrong value using Switch in combination with updateOn: 'blur'
      see [#1362](https://github.com/NativeScript/nativescript-angular/issues/1362)
  * other known controls not working: TextField, Slider
     TODO: report issue?
     TODO: implement option to generally disable updateOn: 'blur' for NativeScript ?

* touched property not working on: Slider
   see [#804](https://github.com/NativeScript/nativescript-angular/issues/804)

* observable focus changes only supported on TextField/TextView
   see [#5902](https://github.com/NativeScript/NativeScript/issues/5902)

