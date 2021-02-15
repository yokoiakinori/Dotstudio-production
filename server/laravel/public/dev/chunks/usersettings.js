(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["usersettings"],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/UserSettings.vue?vue&type=script&lang=js&":
/*!******************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/pages/UserSettings.vue?vue&type=script&lang=js& ***!
  \******************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_ModalWindow_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/ModalWindow.vue */ "./resources/js/components/ModalWindow.vue");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../util */ "./resources/js/util.js");


function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["default"] = ({
  components: {
    ModalWindow: _components_ModalWindow_vue__WEBPACK_IMPORTED_MODULE_1__["default"]
  },
  props: {
    id: {
      type: String,
      required: true
    }
  },
  data: function data() {
    return {
      modalWindow: false,
      preview: null,
      thumbnail: null,
      user: {
        name: String,
        introduction: String,
        thumbnail: String,
        followCount: Number,
        followerCount: Number
      },
      updateForm: {
        name: "",
        introduction: ""
      }
    };
  },
  methods: {
    modalToggle: function modalToggle() {
      this.reset();
      this.modalWindow = !this.modalWindow;
    },
    onFileChange: function onFileChange(event) {
      var _this = this;

      // 何も選択されていなかったら処理中断
      if (event.target.files.length === 0) {
        this.reset();
        return false;
      } // ファイルが画像ではなかったら処理中断


      if (!event.target.files[0].type.match("image.*")) {
        this.reset();
        return false;
      } // FileReaderクラスのインスタンスを取得


      var reader = new FileReader(); // ファイルを読み込み終わったタイミングで実行する処理

      reader.onload = function (e) {
        // previewに読み込み結果（データURL）を代入する
        // previewに値が入ると<output>につけたv-ifがtrueと判定される
        // また<output>内部の<img>のsrc属性はpreviewの値を参照しているので
        // 結果として画像が表示される
        _this.preview = e.target.result;
      }; // ファイルを読み込む
      // 読み込まれたファイルはデータURL形式で受け取れる（上記onload参照）


      reader.readAsDataURL(event.target.files[0]);
      this.thumbnail = event.target.files[0];
    },
    reset: function reset() {
      this.preview = "";
      this.thumbnail = null;
    },
    showUser: function showUser() {
      var _this2 = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {
        var response;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return axios.get("/api/users/".concat(_this2.id));

              case 2:
                response = _context.sent;

                if (!(response.status !== _util__WEBPACK_IMPORTED_MODULE_3__["OK"])) {
                  _context.next = 6;
                  break;
                }

                _this2.$store.commit("error/setCode", response.status);

                return _context.abrupt("return", false);

              case 6:
                _this2.user.name = response.data[0].name;
                _this2.user.introduction = response.data[0].introduction;
                _this2.user.thumbnail = response.data[0].userthumbnail.url;
                _this2.user.followCount = response.data[1];
                _this2.user.followerCount = response.data[2];

              case 11:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }))();
    },
    thumbnailCurrent: function thumbnailCurrent() {
      this.user.thumbnail = this.preview;
      this.modalToggle();
    },
    profileUpdate: function profileUpdate() {
      var _this3 = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee2() {
        var response;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return axios.post("/api/userupdate", _this3.updateForm);

              case 2:
                response = _context2.sent;

                if (!(response.status !== _util__WEBPACK_IMPORTED_MODULE_3__["OK"])) {
                  _context2.next = 6;
                  break;
                }

                _this3.$store.commit("error/setCode", response.status);

                return _context2.abrupt("return", false);

              case 6:
                if (_this3.thumbnail != null) {
                  _this3.thumbnailUpdate();
                }

                _this3.$store.commit("auth/updateUser", response);

                _this3.$router.push("/settings/".concat(_this3.id));

              case 9:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }))();
    },
    thumbnailUpdate: function thumbnailUpdate() {
      var _this4 = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee3() {
        var formData, response;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                formData = new FormData();
                formData.append("userthumbnail", _this4.thumbnail);
                _context3.next = 4;
                return axios.post("/api/thumbnail/update", formData);

              case 4:
                response = _context3.sent;

              case 5:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }))();
    }
  },
  watch: {
    $route: {
      handler: function handler() {
        var _this5 = this;

        return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee4() {
          return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee4$(_context4) {
            while (1) {
              switch (_context4.prev = _context4.next) {
                case 0:
                  _this5.$store.commit("randing/loadingSwitch", true);

                  _context4.next = 3;
                  return _this5.showUser();

                case 3:
                  _this5.$store.commit("randing/loadingSwitch", false);

                case 4:
                case "end":
                  return _context4.stop();
              }
            }
          }, _callee4);
        }))();
      },
      immediate: true
    }
  }
});

/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/UserSettings.vue?vue&type=style&index=0&id=6ae2f7d2&lang=scss&scoped=true&":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-2!./node_modules/sass-loader/dist/cjs.js??ref--6-3!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/pages/UserSettings.vue?vue&type=style&index=0&id=6ae2f7d2&lang=scss&scoped=true& ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "*[data-v-6ae2f7d2],\n*[data-v-6ae2f7d2]::before,\n*[data-v-6ae2f7d2]::after {\n  box-sizing: border-box;\n}\nh1[data-v-6ae2f7d2], h2[data-v-6ae2f7d2], h3[data-v-6ae2f7d2], p[data-v-6ae2f7d2], label[data-v-6ae2f7d2], li[data-v-6ae2f7d2], a[data-v-6ae2f7d2], i[data-v-6ae2f7d2], button[data-v-6ae2f7d2] {\n  color: #282D6F;\n}\np[data-v-6ae2f7d2] {\n  margin: 0;\n}\nli[data-v-6ae2f7d2] {\n  list-style: none;\n}\na[data-v-6ae2f7d2] {\n  text-decoration: none;\n}\noutput[data-v-6ae2f7d2], input[data-v-6ae2f7d2] {\n  border: none;\n  background: none;\n}\noutput[data-v-6ae2f7d2]:focus, input[data-v-6ae2f7d2]:focus {\n  outline: none;\n}\nimg[data-v-6ae2f7d2] {\n  object-fit: cover;\n}\n[data-v-6ae2f7d2]::-webkit-input-placeholder {\n  color: rgba(40, 45, 111, 0.6);\n  font-size: 12px;\n}\ntextarea[data-v-6ae2f7d2] {\n  border: none;\n  background: none;\n}\ntextarea[data-v-6ae2f7d2]:focus {\n  outline: none;\n}\nbutton[data-v-6ae2f7d2] {\n  border: none;\n  background: none;\n  font-size: 14px;\n}\nbutton[data-v-6ae2f7d2]:focus {\n  outline: none;\n}\ni[data-v-6ae2f7d2] {\n  transition-duration: 0.3s;\n}\n.heartIcon[data-v-6ae2f7d2] {\n  color: #d3344e;\n}\nh2[data-v-6ae2f7d2] {\n  margin: 0;\n}\nh1[data-v-6ae2f7d2] {\n  margin: 0;\n  font-size: 25px;\n  font-weight: bold;\n}\n.navbar[data-v-6ae2f7d2] {\n  height: 4rem;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 0 15px;\n}\n.navbar__left[data-v-6ae2f7d2] {\n  justify-content: start;\n}\n.navbar__shadow[data-v-6ae2f7d2] {\n  box-shadow: 0 3px 8px 0 rgba(0, 0, 0, 0.1);\n}\n.navbar__brand[data-v-6ae2f7d2] {\n  font-family: Merriweather, serif;\n  font-weight: bold;\n  font-size: 1.2rem;\n  margin-left: 15px;\n  transition-duration: 0.3s;\n}\n.navbar__brand[data-v-6ae2f7d2]:hover {\n  opacity: 0.6;\n  transition-duration: 0.3s;\n}\n.navbar__menu[data-v-6ae2f7d2] {\n  display: flex;\n  align-items: center;\n}\n.navbar__menu a[data-v-6ae2f7d2] {\n  font-size: 14px;\n}\n.navbar__item a[data-v-6ae2f7d2] {\n  opacity: 0.8;\n  margin-right: 15px;\n}\n.thumbnail[data-v-6ae2f7d2] {\n  border-radius: 50%;\n  object-fit: cover;\n  width: 100%;\n  height: 100%;\n}\n.formButton[data-v-6ae2f7d2] {\n  border: solid 1.5px #282D6F;\n  border-radius: 40px;\n  font-weight: bold;\n  color: #282D6F;\n  transition-duration: 0.3s;\n  cursor: pointer;\n}\n.formButton[data-v-6ae2f7d2]:hover {\n  transition-duration: 0.3s;\n  background-color: #282D6F;\n  color: white;\n}\n.formButton:hover i[data-v-6ae2f7d2] {\n  color: white;\n  transition-duration: 0.3s;\n}\n.button[data-v-6ae2f7d2] {\n  border: 1px solid rgba(40, 45, 111, 0.5);\n  border-radius: 0.25rem;\n  color: rgba(40, 45, 111, 0.6);\n  padding: 8px 15px;\n  background-color: rgba(40, 45, 111, 0.1);\n  transition-duration: 0.3s;\n}\n.button i[data-v-6ae2f7d2] {\n  color: rgba(40, 45, 111, 0.6);\n  margin-right: 5px;\n}\n.button[data-v-6ae2f7d2]:hover {\n  color: #282d6f;\n  border: 1px solid #282d6f;\n}\n.button:hover i[data-v-6ae2f7d2] {\n  color: #282d6f;\n}\n.tab[data-v-6ae2f7d2] {\n  display: flex;\n  list-style: none;\n  margin: 0;\n  padding: 0;\n}\n.tab__item[data-v-6ae2f7d2] {\n  border-bottom: 2px solid rgba(40, 45, 111, 0.6);\n  color: rgba(40, 45, 111, 0.6);\n  cursor: pointer;\n  margin: 0 1rem 0 0;\n  padding: 1rem;\n}\n.tab__item--active[data-v-6ae2f7d2] {\n  border-bottom: 2px solid #282D6F;\n  color: #282D6F;\n  font-weight: bold;\n}\n.container[data-v-6ae2f7d2] {\n  margin: 0 auto;\n  max-width: 1200px;\n  padding: 0 2%;\n}\n.container--small[data-v-6ae2f7d2] {\n  margin: 0 auto;\n  max-width: 600px;\n}\n.panel[data-v-6ae2f7d2] {\n  border: 1px solid rgba(40, 45, 111, 0.4);\n  margin-top: 1rem;\n  padding: 1.5rem;\n}\n.form__item[data-v-6ae2f7d2] {\n  border: 1px solid rgba(40, 45, 111, 0.4);\n  border-radius: 0.25rem;\n  font-size: 1rem;\n  margin-bottom: 1rem;\n  padding: 0.5em 0.75em;\n  width: 100%;\n}\n.form label[data-v-6ae2f7d2] {\n  display: block;\n  margin-bottom: 0.5rem;\n}\n.form__output[data-v-6ae2f7d2] {\n  display: block;\n  margin-bottom: 1rem;\n}\n.form__button[data-v-6ae2f7d2] {\n  text-align: right;\n}\n.errors[data-v-6ae2f7d2] {\n  border: 1px solid red;\n  border-radius: 0.25rem;\n  color: red;\n  margin-bottom: 1rem;\n}\n.pageTitle[data-v-6ae2f7d2] {\n  margin: 0 auto;\n  text-align: center;\n  padding: 20px 0;\n}\n.date[data-v-6ae2f7d2] {\n  color: rgba(40, 45, 111, 0.6);\n  font-size: 12px;\n  text-align: right;\n}\n.v-enter-active[data-v-6ae2f7d2],\n.v-leave-active[data-v-6ae2f7d2] {\n  transition: opacity 0.2s;\n}\n.v-enter[data-v-6ae2f7d2],\n.v-leave-to[data-v-6ae2f7d2] {\n  opacity: 0;\n}\n.wrapper[data-v-6ae2f7d2] {\n  width: 90%;\n  display: flex;\n  flex-flow: wrap column;\n  align-items: center;\n  margin: 0 auto;\n  padding-top: 30px;\n}\n.wrapper form[data-v-6ae2f7d2] {\n  flex-flow: column;\n  display: flex;\n}\n.wrapper h3[data-v-6ae2f7d2] {\n  margin-bottom: 40px;\n}\n.userSettings[data-v-6ae2f7d2] {\n  width: 500px;\n  align-items: center;\n}\n.form__item[data-v-6ae2f7d2] {\n  width: 100%;\n}\n.updateThumbnail[data-v-6ae2f7d2] {\n  width: 150px;\n  height: 150px;\n  margin: auto;\n  position: relative;\n  flex-flow: column;\n  margin-bottom: 30px;\n}\n.updateThumbnail label[data-v-6ae2f7d2] {\n  background-color: rgba(40, 45, 111, 0.2);\n  color: #282D6F;\n  display: inline-block;\n  cursor: pointer;\n  padding: 10px;\n  margin-bottom: 20px;\n}\n.updateThumbnail input[data-v-6ae2f7d2] {\n  display: none;\n}\n.updateThumbnail button[data-v-6ae2f7d2] {\n  background-color: white;\n  position: absolute;\n  top: 100px;\n  left: -7px;\n  padding: 5px 15px;\n  border-radius: 20px;\n  cursor: pointer;\n}\n.updateThumbnail button i[data-v-6ae2f7d2] {\n  margin-right: 5px;\n}\n.thumbnail[data-v-6ae2f7d2] {\n  width: 100%;\n  height: 100%;\n  cursor: pointer;\n}\n.updateInformation[data-v-6ae2f7d2] {\n  margin-left: 20px;\n  height: 180px;\n}\n.updateInformation label[data-v-6ae2f7d2] {\n  margin-top: 10px;\n}\n.imageViewer[data-v-6ae2f7d2] {\n  width: 100%;\n  height: 240px;\n}\n.formButton[data-v-6ae2f7d2] {\n  width: 120px;\n  padding: 5px;\n}", ""]);

// exports


/***/ }),

/***/ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/UserSettings.vue?vue&type=style&index=0&id=6ae2f7d2&lang=scss&scoped=true&":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-2!./node_modules/sass-loader/dist/cjs.js??ref--6-3!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/pages/UserSettings.vue?vue&type=style&index=0&id=6ae2f7d2&lang=scss&scoped=true& ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../node_modules/css-loader!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/postcss-loader/src??ref--6-2!../../../node_modules/sass-loader/dist/cjs.js??ref--6-3!../../../node_modules/vue-loader/lib??vue-loader-options!./UserSettings.vue?vue&type=style&index=0&id=6ae2f7d2&lang=scss&scoped=true& */ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/UserSettings.vue?vue&type=style&index=0&id=6ae2f7d2&lang=scss&scoped=true&");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/UserSettings.vue?vue&type=template&id=6ae2f7d2&scoped=true&":
/*!**********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/pages/UserSettings.vue?vue&type=template&id=6ae2f7d2&scoped=true& ***!
  \**********************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "wrapper" }, [
    _c("h3", [_vm._v("ユーザープロフィールの編集")]),
    _vm._v(" "),
    _c("div", { staticClass: "userSettings" }, [
      _c(
        "div",
        { staticClass: " updateThumbnail" },
        [
          _c(
            "button",
            { staticClass: "edit", on: { click: _vm.modalToggle } },
            [
              _c("i", { staticClass: "fas fa-edit" }),
              _vm._v("変更\n            ")
            ]
          ),
          _vm._v(" "),
          _c("img", {
            staticClass: "thumbnail",
            attrs: {
              src: _vm.user.thumbnail,
              alt: _vm.user.name + "のサムネイル"
            },
            on: { click: _vm.modalToggle }
          }),
          _vm._v(" "),
          _c(
            "transition",
            [
              _vm.modalWindow
                ? _c(
                    "modalWindow",
                    {
                      on: {
                        closeModal: _vm.modalToggle,
                        formEnter: _vm.thumbnailCurrent
                      }
                    },
                    [
                      _c("h3", [_vm._v("サムネイル更新")]),
                      _vm._v(" "),
                      _c("label", { attrs: { for: "file_upload" } }, [
                        _vm._v(
                          "\n                        ファイルを選択してください。\n                        "
                        ),
                        _c("input", {
                          attrs: { type: "file", id: "file_upload" },
                          on: { change: _vm.onFileChange }
                        })
                      ]),
                      _vm._v(" "),
                      _vm.preview
                        ? _c("output", { staticClass: "previewImage" }, [
                            _c("img", {
                              staticClass: "imageViewer",
                              attrs: { src: _vm.preview, alt: "" }
                            })
                          ])
                        : _vm._e()
                    ]
                  )
                : _vm._e()
            ],
            1
          )
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "form",
        {
          staticClass: "form",
          attrs: { action: "" },
          on: {
            submit: function($event) {
              $event.preventDefault()
              return _vm.profileUpdate($event)
            }
          }
        },
        [
          _c("label", { attrs: { for: "update-name" } }, [
            _vm._v("新しい名前")
          ]),
          _vm._v(" "),
          _c("input", {
            directives: [
              {
                name: "model",
                rawName: "v-model",
                value: _vm.updateForm.name,
                expression: "updateForm.name"
              }
            ],
            staticClass: "form__item",
            attrs: { type: "text", placeholder: _vm.user.name },
            domProps: { value: _vm.updateForm.name },
            on: {
              input: function($event) {
                if ($event.target.composing) {
                  return
                }
                _vm.$set(_vm.updateForm, "name", $event.target.value)
              }
            }
          }),
          _vm._v(" "),
          _c("label", { attrs: { for: "update-name" } }, [
            _vm._v("新しい挨拶文")
          ]),
          _vm._v(" "),
          _c("textarea", {
            directives: [
              {
                name: "model",
                rawName: "v-model",
                value: _vm.updateForm.introduction,
                expression: "updateForm.introduction"
              }
            ],
            staticClass: "form__item",
            attrs: {
              placeholder: _vm.user.introduction,
              cols: "30",
              rows: "4"
            },
            domProps: { value: _vm.updateForm.introduction },
            on: {
              input: function($event) {
                if ($event.target.composing) {
                  return
                }
                _vm.$set(_vm.updateForm, "introduction", $event.target.value)
              }
            }
          }),
          _vm._v(" "),
          _vm._m(0)
        ]
      )
    ])
  ])
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "form__button" }, [
      _c("button", { staticClass: "button", attrs: { type: "submit" } }, [
        _vm._v("更新する")
      ])
    ])
  }
]
render._withStripped = true



/***/ }),

/***/ "./resources/js/pages/UserSettings.vue":
/*!*********************************************!*\
  !*** ./resources/js/pages/UserSettings.vue ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _UserSettings_vue_vue_type_template_id_6ae2f7d2_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./UserSettings.vue?vue&type=template&id=6ae2f7d2&scoped=true& */ "./resources/js/pages/UserSettings.vue?vue&type=template&id=6ae2f7d2&scoped=true&");
/* harmony import */ var _UserSettings_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./UserSettings.vue?vue&type=script&lang=js& */ "./resources/js/pages/UserSettings.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _UserSettings_vue_vue_type_style_index_0_id_6ae2f7d2_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./UserSettings.vue?vue&type=style&index=0&id=6ae2f7d2&lang=scss&scoped=true& */ "./resources/js/pages/UserSettings.vue?vue&type=style&index=0&id=6ae2f7d2&lang=scss&scoped=true&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _UserSettings_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _UserSettings_vue_vue_type_template_id_6ae2f7d2_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _UserSettings_vue_vue_type_template_id_6ae2f7d2_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "6ae2f7d2",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/pages/UserSettings.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/pages/UserSettings.vue?vue&type=script&lang=js&":
/*!**********************************************************************!*\
  !*** ./resources/js/pages/UserSettings.vue?vue&type=script&lang=js& ***!
  \**********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_UserSettings_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib??ref--4-0!../../../node_modules/vue-loader/lib??vue-loader-options!./UserSettings.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/UserSettings.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_UserSettings_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/pages/UserSettings.vue?vue&type=style&index=0&id=6ae2f7d2&lang=scss&scoped=true&":
/*!*******************************************************************************************************!*\
  !*** ./resources/js/pages/UserSettings.vue?vue&type=style&index=0&id=6ae2f7d2&lang=scss&scoped=true& ***!
  \*******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_sass_loader_dist_cjs_js_ref_6_3_node_modules_vue_loader_lib_index_js_vue_loader_options_UserSettings_vue_vue_type_style_index_0_id_6ae2f7d2_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/style-loader!../../../node_modules/css-loader!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/postcss-loader/src??ref--6-2!../../../node_modules/sass-loader/dist/cjs.js??ref--6-3!../../../node_modules/vue-loader/lib??vue-loader-options!./UserSettings.vue?vue&type=style&index=0&id=6ae2f7d2&lang=scss&scoped=true& */ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/UserSettings.vue?vue&type=style&index=0&id=6ae2f7d2&lang=scss&scoped=true&");
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_sass_loader_dist_cjs_js_ref_6_3_node_modules_vue_loader_lib_index_js_vue_loader_options_UserSettings_vue_vue_type_style_index_0_id_6ae2f7d2_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_sass_loader_dist_cjs_js_ref_6_3_node_modules_vue_loader_lib_index_js_vue_loader_options_UserSettings_vue_vue_type_style_index_0_id_6ae2f7d2_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_sass_loader_dist_cjs_js_ref_6_3_node_modules_vue_loader_lib_index_js_vue_loader_options_UserSettings_vue_vue_type_style_index_0_id_6ae2f7d2_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_sass_loader_dist_cjs_js_ref_6_3_node_modules_vue_loader_lib_index_js_vue_loader_options_UserSettings_vue_vue_type_style_index_0_id_6ae2f7d2_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "./resources/js/pages/UserSettings.vue?vue&type=template&id=6ae2f7d2&scoped=true&":
/*!****************************************************************************************!*\
  !*** ./resources/js/pages/UserSettings.vue?vue&type=template&id=6ae2f7d2&scoped=true& ***!
  \****************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_UserSettings_vue_vue_type_template_id_6ae2f7d2_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib??vue-loader-options!./UserSettings.vue?vue&type=template&id=6ae2f7d2&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/UserSettings.vue?vue&type=template&id=6ae2f7d2&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_UserSettings_vue_vue_type_template_id_6ae2f7d2_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_UserSettings_vue_vue_type_template_id_6ae2f7d2_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);