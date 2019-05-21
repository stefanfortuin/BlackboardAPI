/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./server.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "../node_modules/@stefanfortuin/blackboardlib-test/api/BBAssignmentAttempt.js":
/*!************************************************************************************!*\
  !*** ../node_modules/@stefanfortuin/blackboardlib-test/api/BBAssignmentAttempt.js ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Backend_1 = __webpack_require__(/*! ./Backend */ "../node_modules/@stefanfortuin/blackboardlib-test/api/Backend.js");

var BBAssignmentAttempt =
/*#__PURE__*/
function () {
  function BBAssignmentAttempt(courseId, columnId, attemptId) {
    _classCallCheck(this, BBAssignmentAttempt);

    this._courseId = courseId;
    this._columnId = columnId;
    this._attemptId = attemptId;
    this.getAttemptInformation();
  }

  _createClass(BBAssignmentAttempt, [{
    key: "getAttemptInformation",
    value: function getAttemptInformation() {
      var _this = this;

      return new Promise(function (resolve, reject) {
        if (_this.assignmentInformation) {
          resolve(_this.assignmentInformation);
          return;
        }

        var parameters = {
          attemptId: _this._attemptId,
          columnId: _this._columnId,
          courseId: _this._courseId
        };
        Backend_1["default"].getBackend().gradeColumns.getAssignmentAttempt(parameters).then(function (information) {
          _this.assignmentInformation = information;
          resolve(_this.assignmentInformation);
        });
      });
    }
  }, {
    key: "getAssociatedFiles",
    value: function getAssociatedFiles() {
      var _this2 = this;

      return new Promise(function (resolve, reject) {
        if (_this2.files) {
          resolve(_this2.files);
          return;
        }

        _this2.getAttemptInformation().then(function (attemptInformation) {
          var parameters = {
            attemptId: attemptInformation.id,
            courseId: _this2._courseId
          };
          return Backend_1["default"].getBackend().gradeColumns.getFilesFromAssignmentAttempt(parameters);
        }).then(function (information) {
          _this2.files = information;
          resolve(_this2.files);
        });
      });
    }
  }, {
    key: "attachFile",
    value: function attachFile(file) {
      var _this3 = this;

      return new Promise(function (resolve, reject) {
        var uploadParameters = {
          file: file
        };
        Promise.all([_this3.getAttemptInformation(), Backend_1["default"].getBackend().files.uploadFile(uploadParameters)]).then(function (responses) {
          var attemptInformation = responses[0];
          var uploadInformation = responses[1];
          var attachmentParameters = {
            attemptId: attemptInformation.id,
            courseId: _this3._courseId,
            fileId: uploadInformation.id
          };
          return Backend_1["default"].getBackend().gradeColumns.addFileToAssignmentAttempt(attachmentParameters);
        }).then(function (information) {
          resolve(information);
        });
      });
    }
  }, {
    key: "removeFile",
    value: function removeFile(fileId) {
      var _this4 = this;

      return new Promise(function (resolve, reject) {
        _this4.getAttemptInformation().then(function (attemptInformation) {
          var parameters = {
            attemptFileId: fileId,
            attemptId: attemptInformation.id,
            courseId: _this4._courseId
          };
          return Backend_1["default"].getBackend().gradeColumns.deleteFileFromAssignmentAttempt(parameters);
        }).then(function (information) {
          resolve(information);
        });
      });
    }
  }, {
    key: "courseId",
    get: function get() {
      return this._courseId;
    }
  }, {
    key: "columnId",
    get: function get() {
      return this._columnId;
    }
  }, {
    key: "attemptId",
    get: function get() {
      return this._attemptId;
    }
  }]);

  return BBAssignmentAttempt;
}();

exports["default"] = BBAssignmentAttempt;

/***/ }),

/***/ "../node_modules/@stefanfortuin/blackboardlib-test/api/BBCourse.js":
/*!*************************************************************************!*\
  !*** ../node_modules/@stefanfortuin/blackboardlib-test/api/BBCourse.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Backend_1 = __webpack_require__(/*! ./Backend */ "../node_modules/@stefanfortuin/blackboardlib-test/api/Backend.js");

var BBCourse =
/*#__PURE__*/
function () {
  function BBCourse() {
    var courseId = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

    _classCallCheck(this, BBCourse);

    this._courseId = {
      courseId: courseId
    };
    this.getCourseInformation();
  }

  _createClass(BBCourse, [{
    key: "getCourseInformation",
    value: function getCourseInformation() {
      var _this = this;

      return new Promise(function (resolve, reject) {
        if (_this.courseInformation) {
          resolve(_this.courseInformation);
          return;
        }

        Backend_1["default"].getBackend().courses.getCourseInformation(_this._courseId).then(function (information) {
          _this.courseInformation = information;
          resolve(_this.courseInformation);
        });
      });
    }
  }, {
    key: "postCourse",
    value: function postCourse() {
      return new Promise(function (resolve, reject) {
        Backend_1["default"].getBackend().courses.postCourse().then(function (course) {
          resolve(course);
        });
      });
    }
  }, {
    key: "deleteCourse",
    value: function deleteCourse() {
      var _this2 = this;

      return new Promise(function (resolve, reject) {
        Backend_1["default"].getBackend().courses.deleteCourse(_this2._courseId).then(function (information) {
          resolve(information);
        });
      });
    }
  }, {
    key: "patchCourse",
    value: function patchCourse() {
      var _this3 = this;

      return new Promise(function (resolve, reject) {
        Backend_1["default"].getBackend().courses.patchCourse(_this3._courseId).then(function (information) {
          resolve(information);
        });
      });
    }
  }, {
    key: "getCourseContents",
    value: function getCourseContents() {
      var _this4 = this;

      return new Promise(function (resolve, reject) {
        if (_this4.courseContents) {
          resolve(_this4.courseContents);
          return;
        }

        Backend_1["default"].getBackend().courses.getCourseContents(_this4._courseId).then(function (contents) {
          _this4.courseContents = contents;
          resolve(_this4.courseContents);
        });
      });
    }
  }, {
    key: "getCourseChildren",
    value: function getCourseChildren() {
      var _this5 = this;

      return new Promise(function (resolve, reject) {
        if (_this5.courseChildren) {
          resolve(_this5.courseChildren);
          return;
        }

        Backend_1["default"].getBackend().courses.getCourseChildren(_this5._courseId).then(function (children) {
          _this5.courseChildren = children;
          resolve(_this5.courseChildren);
        });
      });
    }
  }, {
    key: "getCourseContent",
    value: function getCourseContent(contentId) {
      var _this6 = this;

      return new Promise(function (resolve, reject) {
        if (_this6.courseContents) {
          _this6.courseContents.forEach(function (element) {
            if (element.id == contentId) {
              resolve(element);
              return;
            }
          });
        }

        var parameters = {
          courseId: _this6._courseId.courseId,
          contentId: contentId
        };
        Backend_1["default"].getBackend().courses.getCourseContent(parameters).then(function (child) {
          resolve(child);
        });
      });
    }
  }, {
    key: "postCourseContent",
    value: function postCourseContent() {
      var _this7 = this;

      return new Promise(function (resolve, reject) {
        Backend_1["default"].getBackend().courses.postCourseContent(_this7._courseId).then(function (course) {
          resolve(course);
        });
      });
    }
  }, {
    key: "deleteCourseContent",
    value: function deleteCourseContent(contentId) {
      var _this8 = this;

      return new Promise(function (resolve, reject) {
        var parameters = {
          courseId: _this8._courseId.courseId,
          contentId: contentId
        };
        Backend_1["default"].getBackend().courses.deleteCourseContent(parameters).then(function (course) {
          resolve(course);
        });
      });
    }
  }, {
    key: "patchCourseContent",
    value: function patchCourseContent(contentId) {
      var _this9 = this;

      return new Promise(function (resolve, reject) {
        var parameters = {
          courseId: _this9._courseId.courseId,
          contentId: contentId
        };
        Backend_1["default"].getBackend().courses.patchCourseContent(parameters).then(function (course) {
          resolve(course);
        });
      });
    }
  }, {
    key: "getCourseContentChildren",
    value: function getCourseContentChildren(contentId) {
      var _this10 = this;

      return new Promise(function (resolve, reject) {
        var parameters = {
          courseId: _this10._courseId.courseId,
          contentId: contentId
        };
        Backend_1["default"].getBackend().courses.getCourseContentChildren(parameters).then(function (course) {
          resolve(course);
        });
      });
    }
  }, {
    key: "postCourseContentChildren",
    value: function postCourseContentChildren(contentId) {
      var _this11 = this;

      return new Promise(function (resolve, reject) {
        var parameters = {
          courseId: _this11._courseId.courseId,
          contentId: contentId
        };
        Backend_1["default"].getBackend().courses.postCourseContentChildren(parameters).then(function (course) {
          resolve(course);
        });
      });
    }
  }, {
    key: "getAssignmentCols",
    value: function getAssignmentCols() {
      var _this12 = this;

      return new Promise(function (resolve, reject) {
        if (_this12.assignments) {
          resolve(_this12.assignments);
          return;
        }

        Backend_1["default"].getBackend().courses.getAssignmentCols(_this12._courseId).then(function (assignments) {
          resolve(assignments);
        });
      });
    }
  }, {
    key: "getAnnouncements",
    value: function getAnnouncements() {
      var _this13 = this;

      return new Promise(function (resolve, reject) {
        Backend_1["default"].getBackend().courses.getAnnouncements(_this13._courseId).then(function (announcements) {
          resolve(announcements);
        });
      });
    }
  }]);

  return BBCourse;
}();

exports["default"] = BBCourse;

/***/ }),

/***/ "../node_modules/@stefanfortuin/blackboardlib-test/api/BBEmail.js":
/*!************************************************************************!*\
  !*** ../node_modules/@stefanfortuin/blackboardlib-test/api/BBEmail.js ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Backend_1 = __webpack_require__(/*! ./Backend */ "../node_modules/@stefanfortuin/blackboardlib-test/api/Backend.js");

var BBEmail =
/*#__PURE__*/
function () {
  function BBEmail(courseId, recipients) {
    _classCallCheck(this, BBEmail);

    this._courseId = courseId;
    this._recipients = recipients;
    this._subject = '';
    this._message = '';
    this._returnRecipient = false;
    this._attachments = [];
  }

  _createClass(BBEmail, [{
    key: "addAttachment",
    value: function addAttachment(attachment) {
      this._attachments.push(attachment);
    }
  }, {
    key: "send",
    value: function send() {
      var parameters = {
        attachments: this.attachments,
        body: this.message,
        courseId: this.courseId,
        recipients: this.recipients.asPlainObject(),
        returnRecipient: this.returnRecipient,
        subject: this.subject
      };
      return Backend_1["default"].getBackend().email.sendMail(parameters);
    }
  }, {
    key: "courseId",
    get: function get() {
      return this._courseId;
    }
  }, {
    key: "subject",
    get: function get() {
      return this._subject;
    },
    set: function set(subject) {
      this._subject = subject;
    }
  }, {
    key: "message",
    get: function get() {
      return this._message;
    },
    set: function set(message) {
      this._message = message;
    }
  }, {
    key: "recipients",
    get: function get() {
      return this._recipients;
    },
    set: function set(recipients) {
      this._recipients = recipients;
    }
  }, {
    key: "returnRecipient",
    get: function get() {
      return this._returnRecipient;
    },
    set: function set(returnRecipient) {
      this._returnRecipient = returnRecipient;
    }
  }, {
    key: "attachments",
    get: function get() {
      return this._attachments;
    },
    set: function set(attachments) {
      this._attachments = attachments;
    }
  }]);

  return BBEmail;
}();

exports["default"] = BBEmail;

/***/ }),

/***/ "../node_modules/@stefanfortuin/blackboardlib-test/api/BBFile.js":
/*!***********************************************************************!*\
  !*** ../node_modules/@stefanfortuin/blackboardlib-test/api/BBFile.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Backend_1 = __webpack_require__(/*! ./Backend */ "../node_modules/@stefanfortuin/blackboardlib-test/api/Backend.js");

var BBFile =
/*#__PURE__*/
function () {
  function BBFile(course, name) {
    _classCallCheck(this, BBFile);

    this._course = course;
    this._name = name;
  }

  _createClass(BBFile, [{
    key: "setBody",
    value: function setBody(body) {
      this._body = body;
    }
  }, {
    key: "createFolder",
    value: function createFolder() {
      var _this = this;

      return new Promise(function (resolve, reject) {
        _this._course.getCourseInformation().then(function (information) {
          var parameters = {
            id: information.id,
            courseId: information.courseId,
            name: _this._name
          };
          resolve(Backend_1["default"].getBackend().files.createFolder(parameters));
        });
      });
    }
  }, {
    key: "deleteFile",
    value: function deleteFile() {
      var _this2 = this;

      return new Promise(function (resolve, reject) {
        _this2._course.getCourseInformation().then(function (information) {
          var parameters = {
            id: information.id,
            courseId: information.courseId,
            name: _this2._name
          };
          resolve(Backend_1["default"].getBackend().files.deleteFile(parameters));
        });
      });
    }
  }, {
    key: "downloadFile",
    value: function downloadFile() {
      var _this3 = this;

      return new Promise(function (resolve, reject) {
        _this3._course.getCourseInformation().then(function (information) {
          var parameters = {
            id: information.id,
            courseId: information.courseId,
            name: _this3._name
          };
          resolve(Backend_1["default"].getBackend().files.downloadFile(parameters));
        });
      });
    }
  }, {
    key: "publishFile",
    value: function publishFile() {
      var _this4 = this;

      return new Promise(function (resolve, reject) {
        _this4._course.getCourseInformation().then(function (information) {
          var parameters = {
            courseId: information.courseId,
            id: information.id,
            name: _this4._name,
            body: _this4._body
          };
          resolve(Backend_1["default"].getBackend().files.publishFile(parameters));
        });
      });
    }
  }, {
    key: "setPermissions",
    value: function setPermissions() {
      var _this5 = this;

      var permissions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      if (permissions !== null) this._permissions = permissions;
      return new Promise(function (resolve, reject) {
        _this5._course.getCourseInformation().then(function (information) {
          var parameters = {
            courseId: information.courseId,
            id: information.id,
            name: _this5._name,
            bAllowEveryone: _this5._permissions.bAllowEveryone,
            B: _this5._permissions.B,
            G: _this5._permissions.G,
            P: _this5._permissions.P,
            S: _this5._permissions.S,
            T: _this5._permissions.T,
            U: _this5._permissions.U,
            bAllowRead: _this5._permissions.bAllowRead,
            bAllowWrite: _this5._permissions.bAllowWrite,
            bAllowDelete: _this5._permissions.bAllowDelete,
            bAllowManage: _this5._permissions.bAllowManage
          };
          resolve(Backend_1["default"].getBackend().files.setPermissions(parameters));
        });
      });
    }
  }]);

  return BBFile;
}();

exports["default"] = BBFile;

/***/ }),

/***/ "../node_modules/@stefanfortuin/blackboardlib-test/api/BBGradeColumn.js":
/*!******************************************************************************!*\
  !*** ../node_modules/@stefanfortuin/blackboardlib-test/api/BBGradeColumn.js ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Backend_1 = __webpack_require__(/*! ./Backend */ "../node_modules/@stefanfortuin/blackboardlib-test/api/Backend.js");

var BBGradeColumn =
/*#__PURE__*/
function () {
  function BBGradeColumn(courseId, columnId) {
    _classCallCheck(this, BBGradeColumn);

    this._columnId = {
      courseId: courseId,
      columnId: columnId
    };
  }

  _createClass(BBGradeColumn, [{
    key: "getAssignmentCol",
    value: function getAssignmentCol() {
      var _this = this;

      return new Promise(function (resolve) {
        if (_this._column) {
          resolve(_this._column);
          return;
        }

        Backend_1["default"].getBackend().gradeColumns.getAssignmentCol(_this._columnId).then(function (information) {
          _this._column = information;
          resolve(information);
        });
      });
    }
  }, {
    key: "deleteAssignmentCol",
    value: function deleteAssignmentCol() {
      var _this2 = this;

      return new Promise(function (resolve) {
        Backend_1["default"].getBackend().gradeColumns.deleteAssignmentCol(_this2._columnId).then(function (information) {
          var response = {
            success: true
          };
          resolve(response);
        });
      });
    }
  }, {
    key: "getAssignmentAttempts",
    value: function getAssignmentAttempts() {
      var _this3 = this;

      return new Promise(function (resolve) {
        Backend_1["default"].getBackend().gradeColumns.getAssignmentAttempts(_this3._columnId).then(function (information) {
          resolve(information);
        });
      });
    }
  }, {
    key: "getAssignmentAttempt",
    value: function getAssignmentAttempt(assignmentId) {
      return new Promise(function (resolve) {
        Backend_1["default"].getBackend().gradeColumns.getAssignmentAttempt(assignmentId).then(function (information) {
          resolve(information);
        });
      });
    }
  }, {
    key: "columnId",
    get: function get() {
      return this._columnId.columnId;
    }
  }, {
    key: "courseId",
    get: function get() {
      return this._columnId.courseId;
    }
  }]);

  return BBGradeColumn;
}();

exports["default"] = BBGradeColumn;

/***/ }),

/***/ "../node_modules/@stefanfortuin/blackboardlib-test/api/BBGroup.js":
/*!************************************************************************!*\
  !*** ../node_modules/@stefanfortuin/blackboardlib-test/api/BBGroup.js ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Backend_1 = __webpack_require__(/*! ./Backend */ "../node_modules/@stefanfortuin/blackboardlib-test/api/Backend.js");

var BBGroup =
/*#__PURE__*/
function () {
  function BBGroup(courseId) {
    _classCallCheck(this, BBGroup);

    this._courseId = courseId;
  }

  _createClass(BBGroup, [{
    key: "getGroups",
    value: function getGroups() {
      var _this = this;

      return new Promise(function (resolve, reject) {
        if (_this.groups) {
          resolve(_this.groups);
          return;
        }

        var parameters = {
          courseId: _this.courseId
        };
        Backend_1["default"].getBackend().groups.getGroups(parameters).then(function (information) {
          _this.groups = information;
          resolve(_this.groups);
        });
      });
    }
  }, {
    key: "courseId",
    get: function get() {
      return this._courseId;
    }
  }]);

  return BBGroup;
}();

exports["default"] = BBGroup;

/***/ }),

/***/ "../node_modules/@stefanfortuin/blackboardlib-test/api/BBUser.js":
/*!***********************************************************************!*\
  !*** ../node_modules/@stefanfortuin/blackboardlib-test/api/BBUser.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Backend_1 = __webpack_require__(/*! ./Backend */ "../node_modules/@stefanfortuin/blackboardlib-test/api/Backend.js");

var BBUser =
/*#__PURE__*/
function () {
  function BBUser(userId) {
    _classCallCheck(this, BBUser);

    this._userId = userId;
  }

  _createClass(BBUser, [{
    key: "getEnrolledCourses",
    value: function getEnrolledCourses() {
      var _this = this;

      return new Promise(function (resolve, reject) {
        if (_this.enrolledCourses) {
          resolve(_this.enrolledCourses);
          return;
        }

        var parameters = {
          offset: 0,
          userId: _this.userId
        };
        Backend_1["default"].getBackend().courses.getEnrolledCourses(parameters).then(function (information) {
          _this.enrolledCourses = information;
          resolve(_this.enrolledCourses);
        });
      });
    }
  }, {
    key: "getGrades",
    value: function getGrades(course) {
      var _this2 = this;

      return new Promise(function (resolve, reject) {
        if (_this2.grades) {
          resolve(_this2.grades);
          return;
        }

        var parameters = {
          courseId: course.courseId,
          userId: _this2.userId
        };
        Backend_1["default"].getBackend().gradeColumns.getUserGrades(parameters).then(function (information) {
          _this2.grades = information;
          resolve(_this2.grades);
        });
      });
    }
  }, {
    key: "userId",
    get: function get() {
      return this._userId;
    }
  }]);

  return BBUser;
}();

exports["default"] = BBUser;

/***/ }),

/***/ "../node_modules/@stefanfortuin/blackboardlib-test/api/BBUserInfo.js":
/*!***************************************************************************!*\
  !*** ../node_modules/@stefanfortuin/blackboardlib-test/api/BBUserInfo.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Backend_1 = __webpack_require__(/*! ./Backend */ "../node_modules/@stefanfortuin/blackboardlib-test/api/Backend.js");

var BBUserInfo =
/*#__PURE__*/
function () {
  function BBUserInfo() {
    _classCallCheck(this, BBUserInfo);
  }

  _createClass(BBUserInfo, [{
    key: "getCurrentUserId",
    value: function getCurrentUserId() {
      return new Promise(function (resolve, reject) {
        Backend_1["default"].getBackend().users.getCurrentUserId(null).then(function (userid) {
          resolve(userid);
        });
      });
    }
  }, {
    key: "getUserName",
    value: function getUserName() {
      var _this = this;

      return new Promise(function (resolve, reject) {
        if (_this._userName) {
          resolve(_this._userName);
          return;
        }

        _this.getUserInfo().then(function () {
          resolve(_this._userName);
        });
      });
    }
  }, {
    key: "getUserId",
    value: function getUserId() {
      var _this2 = this;

      return new Promise(function (resolve, reject) {
        if (_this2._userId) {
          resolve(_this2._userId);
          return;
        }

        _this2.getUserInfo().then(function () {
          resolve(_this2._userId);
        });
      });
    }
  }, {
    key: "getUserInfo",
    value: function getUserInfo() {
      var _this3 = this;

      return new Promise(function (resolve, reject) {
        var parameters;

        if (_this3.userInfo) {
          resolve(_this3.userInfo);
          return;
        }

        if (_this3._userName) {
          parameters = {
            userName: _this3._userName
          };
        } else if (_this3._userId) {
          parameters = {
            userId: _this3._userId
          };
        } else {
          throw new Error("BBUserInfo: expecting userId or userName to be not null.");
        }

        Backend_1["default"].getBackend().users.getUserInfo(parameters).then(function (information) {
          _this3.userInfo = information;
          _this3._userId = _this3.userInfo.id;
          _this3._userName = _this3.userInfo.username;
          resolve(_this3.userInfo);
        });
      });
    }
  }, {
    key: "getEnrolledCourses",
    value: function getEnrolledCourses() {
      var _this4 = this;

      return new Promise(function (resolve, reject) {
        if (_this4.enrolledCourses) {
          resolve(_this4.enrolledCourses);
          return;
        }

        _this4.getUserInfo().then(function (uinfo) {
          var parameters = {
            offset: 0,
            userId: uinfo.id
          };
          Backend_1["default"].getBackend().courses.getEnrolledCourses(parameters).then(function (information) {
            _this4.enrolledCourses = information;
            resolve(_this4.enrolledCourses);
          });
        });
      });
    }
  }]);

  return BBUserInfo;
}();

exports.BBUserInfo = BBUserInfo;

var BBUserInfoById =
/*#__PURE__*/
function (_BBUserInfo) {
  _inherits(BBUserInfoById, _BBUserInfo);

  function BBUserInfoById(userId) {
    var _this5;

    _classCallCheck(this, BBUserInfoById);

    _this5 = _possibleConstructorReturn(this, _getPrototypeOf(BBUserInfoById).call(this));
    _this5._userId = userId;
    return _this5;
  }

  return BBUserInfoById;
}(BBUserInfo);

exports.BBUserInfoById = BBUserInfoById;

var BBUserInfoByUsername =
/*#__PURE__*/
function (_BBUserInfo2) {
  _inherits(BBUserInfoByUsername, _BBUserInfo2);

  function BBUserInfoByUsername(userName) {
    var _this6;

    _classCallCheck(this, BBUserInfoByUsername);

    _this6 = _possibleConstructorReturn(this, _getPrototypeOf(BBUserInfoByUsername).call(this));
    _this6._userName = userName;
    return _this6;
  }

  return BBUserInfoByUsername;
}(BBUserInfo);

exports.BBUserInfoByUsername = BBUserInfoByUsername;

/***/ }),

/***/ "../node_modules/@stefanfortuin/blackboardlib-test/api/Backend.js":
/*!************************************************************************!*\
  !*** ../node_modules/@stefanfortuin/blackboardlib-test/api/Backend.js ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Backend =
/*#__PURE__*/
function () {
  function Backend() {
    _classCallCheck(this, Backend);
  }

  _createClass(Backend, null, [{
    key: "setBackend",
    value: function setBackend(backend) {
      this.backend = backend;
    }
  }, {
    key: "getBackend",
    value: function getBackend() {
      if (!this.backend) {
        throw new Error("Error: !!!Backend not set!!!");
      }

      return this.backend;
    }
  }]);

  return Backend;
}();

exports["default"] = Backend;

/***/ }),

/***/ "../node_modules/@stefanfortuin/blackboardlib-test/api/index.js":
/*!**********************************************************************!*\
  !*** ../node_modules/@stefanfortuin/blackboardlib-test/api/index.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var Backend_1 = __webpack_require__(/*! ./Backend */ "../node_modules/@stefanfortuin/blackboardlib-test/api/Backend.js");

exports.Backend = Backend_1["default"];

var BBAssignmentAttempt_1 = __webpack_require__(/*! ./BBAssignmentAttempt */ "../node_modules/@stefanfortuin/blackboardlib-test/api/BBAssignmentAttempt.js");

exports.BBAssignmentAttempt = BBAssignmentAttempt_1["default"];

var BBCourse_1 = __webpack_require__(/*! ./BBCourse */ "../node_modules/@stefanfortuin/blackboardlib-test/api/BBCourse.js");

exports.BBCourse = BBCourse_1["default"];

var BBEmail_1 = __webpack_require__(/*! ./BBEmail */ "../node_modules/@stefanfortuin/blackboardlib-test/api/BBEmail.js");

exports.BBEmail = BBEmail_1["default"];

var BBFile_1 = __webpack_require__(/*! ./BBFile */ "../node_modules/@stefanfortuin/blackboardlib-test/api/BBFile.js");

exports.BBFile = BBFile_1["default"];

var BBGradeColumn_1 = __webpack_require__(/*! ./BBGradeColumn */ "../node_modules/@stefanfortuin/blackboardlib-test/api/BBGradeColumn.js");

exports.BBGradeColumn = BBGradeColumn_1["default"];

var BBGroup_1 = __webpack_require__(/*! ./BBGroup */ "../node_modules/@stefanfortuin/blackboardlib-test/api/BBGroup.js");

exports.BBGroup = BBGroup_1["default"];

var BBUser_1 = __webpack_require__(/*! ./BBUser */ "../node_modules/@stefanfortuin/blackboardlib-test/api/BBUser.js");

exports.BBUser = BBUser_1["default"];

var BBUserInfo_1 = __webpack_require__(/*! ./BBUserInfo */ "../node_modules/@stefanfortuin/blackboardlib-test/api/BBUserInfo.js");

exports.BBUserInfo = BBUserInfo_1.BBUserInfo;
exports.BBUserInfoById = BBUserInfo_1.BBUserInfoById;
exports.BBUserInfoByUsername = BBUserInfo_1.BBUserInfoByUsername;

/***/ }),

/***/ "../node_modules/@stefanfortuin/blackboardlib-test/backend/BBIframeBackend/BBCourses.js":
/*!**********************************************************************************************!*\
  !*** ../node_modules/@stefanfortuin/blackboardlib-test/backend/BBIframeBackend/BBCourses.js ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

Object.defineProperty(exports, "__esModule", {
  value: true
});

var courses_1 = __webpack_require__(/*! ../../common/BBAbstractBackend/courses */ "../node_modules/@stefanfortuin/blackboardlib-test/common/BBAbstractBackend/courses.js");

var BBCourses =
/*#__PURE__*/
function (_courses_1$default) {
  _inherits(BBCourses, _courses_1$default);

  function BBCourses(category, backend) {
    var _this;

    _classCallCheck(this, BBCourses);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(BBCourses).call(this));
    _this.backend = backend;
    _this.category = category;
    return _this;
  }

  _createClass(BBCourses, [{
    key: "getEnrolledCourses",
    value: function getEnrolledCourses(parameters) {
      return this.backend.sendMessageThroughConnectionManager(this.category, "getEnrolledCourses", parameters);
    }
  }, {
    key: "getCourseInformation",
    value: function getCourseInformation(parameters) {
      return this.backend.sendMessageThroughConnectionManager(this.category, "getCourseInformation", parameters);
    }
  }, {
    key: "postCourse",
    value: function postCourse() {
      return this.backend.sendMessageThroughConnectionManager(this.category, "postCourse");
    }
  }, {
    key: "deleteCourse",
    value: function deleteCourse(parameters) {
      return this.backend.sendMessageThroughConnectionManager(this.category, "deleteCourse", parameters);
    }
  }, {
    key: "patchCourse",
    value: function patchCourse(parameters) {
      return this.backend.sendMessageThroughConnectionManager(this.category, "patchCourse", parameters);
    }
  }, {
    key: "getCourseContents",
    value: function getCourseContents(parameters) {
      return this.backend.sendMessageThroughConnectionManager(this.category, "getCourseContents", parameters);
    }
  }, {
    key: "getCourseContent",
    value: function getCourseContent(parameters) {
      return this.backend.sendMessageThroughConnectionManager(this.category, "getCourseContent", parameters);
    }
  }, {
    key: "getCourseContentChildren",
    value: function getCourseContentChildren(parameters) {
      return this.backend.sendMessageThroughConnectionManager(this.category, "getCourseContentChildren", parameters);
    }
  }, {
    key: "postCourseContent",
    value: function postCourseContent(parameters) {
      return this.backend.sendMessageThroughConnectionManager(this.category, "postCourseContent", parameters);
    }
  }, {
    key: "postCourseContentChildren",
    value: function postCourseContentChildren(parameters) {
      return this.backend.sendMessageThroughConnectionManager(this.category, "postCourseContentChildren", parameters);
    }
  }, {
    key: "deleteCourseContent",
    value: function deleteCourseContent(parameters) {
      return this.backend.sendMessageThroughConnectionManager(this.category, "deleteCourseContent", parameters);
    }
  }, {
    key: "patchCourseContent",
    value: function patchCourseContent(parameters) {
      return this.backend.sendMessageThroughConnectionManager(this.category, "patchCourseContent", parameters);
    }
  }, {
    key: "getCourseChildren",
    value: function getCourseChildren(parameters) {
      return this.backend.sendMessageThroughConnectionManager(this.category, "getCourseChildren", parameters);
    }
  }, {
    key: "getAssignmentCols",
    value: function getAssignmentCols(parameters) {
      return this.backend.sendMessageThroughConnectionManager(this.category, "getAssignmentCols", parameters);
    }
  }, {
    key: "getAnnouncements",
    value: function getAnnouncements(parameters) {
      return this.backend.sendMessageThroughConnectionManager(this.category, "getAnnouncements", parameters);
    }
  }]);

  return BBCourses;
}(courses_1["default"]);

exports["default"] = BBCourses;

/***/ }),

/***/ "../node_modules/@stefanfortuin/blackboardlib-test/backend/BBIframeBackend/BBEmails.js":
/*!*********************************************************************************************!*\
  !*** ../node_modules/@stefanfortuin/blackboardlib-test/backend/BBIframeBackend/BBEmails.js ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

Object.defineProperty(exports, "__esModule", {
  value: true
});

var email_1 = __webpack_require__(/*! ../../common/BBAbstractBackend/email */ "../node_modules/@stefanfortuin/blackboardlib-test/common/BBAbstractBackend/email.js");

var BBEmails =
/*#__PURE__*/
function (_email_1$default) {
  _inherits(BBEmails, _email_1$default);

  function BBEmails(category, backend) {
    var _this;

    _classCallCheck(this, BBEmails);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(BBEmails).call(this));
    _this.backend = backend;
    _this.category = category;
    return _this;
  }

  _createClass(BBEmails, [{
    key: "sendMail",
    value: function sendMail(parameters) {
      return this.backend.sendMessageThroughConnectionManager(this.category, "sendMail", parameters);
    }
  }]);

  return BBEmails;
}(email_1["default"]);

exports["default"] = BBEmails;

/***/ }),

/***/ "../node_modules/@stefanfortuin/blackboardlib-test/backend/BBIframeBackend/BBFiles.js":
/*!********************************************************************************************!*\
  !*** ../node_modules/@stefanfortuin/blackboardlib-test/backend/BBIframeBackend/BBFiles.js ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

Object.defineProperty(exports, "__esModule", {
  value: true
});

var files_1 = __webpack_require__(/*! ../../common/BBAbstractBackend/files */ "../node_modules/@stefanfortuin/blackboardlib-test/common/BBAbstractBackend/files.js");

var BBFiles =
/*#__PURE__*/
function (_files_1$default) {
  _inherits(BBFiles, _files_1$default);

  function BBFiles(category, backend) {
    var _this;

    _classCallCheck(this, BBFiles);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(BBFiles).call(this));
    _this.backend = backend;
    _this.category = category;
    return _this;
  }

  _createClass(BBFiles, [{
    key: "getFileInfo",
    value: function getFileInfo(parameters) {
      return this.backend.sendMessageThroughConnectionManager(this.category, "getFileInfo", parameters);
    }
  }, {
    key: "createFolder",
    value: function createFolder(parameters) {
      return this.backend.sendMessageThroughConnectionManager(this.category, "createFolder", parameters);
    }
  }, {
    key: "deleteFile",
    value: function deleteFile(parameters) {
      return this.backend.sendMessageThroughConnectionManager(this.category, "deleteFile", parameters);
    }
  }, {
    key: "downloadFile",
    value: function downloadFile(parameters) {
      return this.backend.sendMessageThroughConnectionManager(this.category, "downloadFile", parameters);
    }
  }, {
    key: "publishFile",
    value: function publishFile(parameters) {
      return this.backend.sendMessageThroughConnectionManager(this.category, "publishFile", parameters);
    }
  }, {
    key: "setPermissions",
    value: function setPermissions(parameters) {
      return this.backend.sendMessageThroughConnectionManager(this.category, "setPermissions", parameters);
    }
  }, {
    key: "uploadFile",
    value: function uploadFile(parameters) {
      return this.backend.sendMessageThroughConnectionManager(this.category, "uploadFile", parameters);
    }
  }]);

  return BBFiles;
}(files_1["default"]);

exports["default"] = BBFiles;

/***/ }),

/***/ "../node_modules/@stefanfortuin/blackboardlib-test/backend/BBIframeBackend/BBGradeColumns.js":
/*!***************************************************************************************************!*\
  !*** ../node_modules/@stefanfortuin/blackboardlib-test/backend/BBIframeBackend/BBGradeColumns.js ***!
  \***************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

Object.defineProperty(exports, "__esModule", {
  value: true
});

var gradeColumns_1 = __webpack_require__(/*! ../../common/BBAbstractBackend/gradeColumns */ "../node_modules/@stefanfortuin/blackboardlib-test/common/BBAbstractBackend/gradeColumns.js");

var BBGradeColumns =
/*#__PURE__*/
function (_gradeColumns_1$defau) {
  _inherits(BBGradeColumns, _gradeColumns_1$defau);

  function BBGradeColumns(category, backend) {
    var _this;

    _classCallCheck(this, BBGradeColumns);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(BBGradeColumns).call(this));
    _this.backend = backend;
    _this.category = category;
    return _this;
  }

  _createClass(BBGradeColumns, [{
    key: "getAssignmentCol",
    value: function getAssignmentCol(parameters) {
      return this.backend.sendMessageThroughConnectionManager(this.category, "getAssignmentCol", parameters);
    }
  }, {
    key: "deleteAssignmentCol",
    value: function deleteAssignmentCol(parameters) {
      return this.backend.sendMessageThroughConnectionManager(this.category, "deleteAssignmentCol", parameters);
    }
  }, {
    key: "createAssignmentAttempt",
    value: function createAssignmentAttempt(parameters) {
      return this.backend.sendMessageThroughConnectionManager(this.category, "createAssignmentAttempt", parameters);
    }
  }, {
    key: "updateAssignmentAttempt",
    value: function updateAssignmentAttempt(parameters) {
      return this.backend.sendMessageThroughConnectionManager(this.category, "updateAssignmentAttempt", parameters);
    }
  }, {
    key: "getAssignmentAttempt",
    value: function getAssignmentAttempt(parameters) {
      return this.backend.sendMessageThroughConnectionManager(this.category, "getAssignmentAttempt", parameters);
    }
  }, {
    key: "getAssignmentAttempts",
    value: function getAssignmentAttempts(parameters) {
      return this.backend.sendMessageThroughConnectionManager(this.category, "getAssignmentAttempts", parameters);
    }
  }, {
    key: "addFileToAssignmentAttempt",
    value: function addFileToAssignmentAttempt(parameters) {
      return this.backend.sendMessageThroughConnectionManager(this.category, "addFileToAssignmentAttempt", parameters);
    }
  }, {
    key: "deleteFileFromAssignmentAttempt",
    value: function deleteFileFromAssignmentAttempt(parameters) {
      return this.backend.sendMessageThroughConnectionManager(this.category, "deleteFileFromAssignmentAttempt", parameters);
    }
  }, {
    key: "downloadFileFromAssignmentAttempt",
    value: function downloadFileFromAssignmentAttempt(parameters) {
      return this.backend.sendMessageThroughConnectionManager(this.category, "downloadFileFromAssignmentAttempt", parameters);
    }
  }, {
    key: "getFileFromAssignmentAttempt",
    value: function getFileFromAssignmentAttempt(parameters) {
      return this.backend.sendMessageThroughConnectionManager(this.category, "getFileFromAssignmentAttempt", parameters);
    }
  }, {
    key: "getFilesFromAssignmentAttempt",
    value: function getFilesFromAssignmentAttempt(parameters) {
      return this.backend.sendMessageThroughConnectionManager(this.category, "getFilesFromAssignmentAttempt", parameters);
    }
  }, {
    key: "getUserGrades",
    value: function getUserGrades(parameters) {
      return this.backend.sendMessageThroughConnectionManager(this.category, "getUserGrades", parameters);
    }
  }]);

  return BBGradeColumns;
}(gradeColumns_1["default"]);

exports["default"] = BBGradeColumns;

/***/ }),

/***/ "../node_modules/@stefanfortuin/blackboardlib-test/backend/BBIframeBackend/BBGroups.js":
/*!*********************************************************************************************!*\
  !*** ../node_modules/@stefanfortuin/blackboardlib-test/backend/BBIframeBackend/BBGroups.js ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

Object.defineProperty(exports, "__esModule", {
  value: true
});

var groups_1 = __webpack_require__(/*! ../../common/BBAbstractBackend/groups */ "../node_modules/@stefanfortuin/blackboardlib-test/common/BBAbstractBackend/groups.js");

var BBGroups =
/*#__PURE__*/
function (_groups_1$default) {
  _inherits(BBGroups, _groups_1$default);

  function BBGroups(category, backend) {
    var _this;

    _classCallCheck(this, BBGroups);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(BBGroups).call(this));
    _this.backend = backend;
    _this.category = category;
    return _this;
  }

  _createClass(BBGroups, [{
    key: "getGroups",
    value: function getGroups(parameters) {
      return this.backend.sendMessageThroughConnectionManager(this.category, "getGroups", parameters);
    }
  }]);

  return BBGroups;
}(groups_1["default"]);

exports["default"] = BBGroups;

/***/ }),

/***/ "../node_modules/@stefanfortuin/blackboardlib-test/backend/BBIframeBackend/BBMisc.js":
/*!*******************************************************************************************!*\
  !*** ../node_modules/@stefanfortuin/blackboardlib-test/backend/BBIframeBackend/BBMisc.js ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

Object.defineProperty(exports, "__esModule", {
  value: true
});

var misc_1 = __webpack_require__(/*! ../../common/BBAbstractBackend/misc */ "../node_modules/@stefanfortuin/blackboardlib-test/common/BBAbstractBackend/misc.js");

var BBMisc =
/*#__PURE__*/
function (_misc_1$default) {
  _inherits(BBMisc, _misc_1$default);

  function BBMisc(category, backend) {
    var _this;

    _classCallCheck(this, BBMisc);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(BBMisc).call(this));
    _this.backend = backend;
    _this.category = category;
    return _this;
  }

  _createClass(BBMisc, [{
    key: "getBlackboardDomain",
    value: function getBlackboardDomain() {
      throw new Error("Method not implemented.");
    }
  }]);

  return BBMisc;
}(misc_1["default"]);

exports["default"] = BBMisc;

/***/ }),

/***/ "../node_modules/@stefanfortuin/blackboardlib-test/backend/BBIframeBackend/BBUsers.js":
/*!********************************************************************************************!*\
  !*** ../node_modules/@stefanfortuin/blackboardlib-test/backend/BBIframeBackend/BBUsers.js ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

Object.defineProperty(exports, "__esModule", {
  value: true
});

var users_1 = __webpack_require__(/*! ../../common/BBAbstractBackend/users */ "../node_modules/@stefanfortuin/blackboardlib-test/common/BBAbstractBackend/users.js");

var BBUsers =
/*#__PURE__*/
function (_users_1$default) {
  _inherits(BBUsers, _users_1$default);

  function BBUsers(category, backend) {
    var _this;

    _classCallCheck(this, BBUsers);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(BBUsers).call(this));
    _this.backend = backend;
    _this.category = category;
    return _this;
  }

  _createClass(BBUsers, [{
    key: "getUserInfo",
    value: function getUserInfo(parameters) {
      return this.backend.sendMessageThroughConnectionManager(this.category, "getUserInfo", parameters);
    }
  }, {
    key: "getCurrentUserId",
    value: function getCurrentUserId(parameters) {
      return this.backend.sendMessageThroughConnectionManager(this.category, "getCurrentUserId", parameters);
    }
  }]);

  return BBUsers;
}(users_1["default"]);

exports["default"] = BBUsers;

/***/ }),

/***/ "../node_modules/@stefanfortuin/blackboardlib-test/backend/BBIframeBackend/index.js":
/*!******************************************************************************************!*\
  !*** ../node_modules/@stefanfortuin/blackboardlib-test/backend/BBIframeBackend/index.js ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

Object.defineProperty(exports, "__esModule", {
  value: true
});

var common_1 = __webpack_require__(/*! ../../common */ "../node_modules/@stefanfortuin/blackboardlib-test/common/index.js");

var BBCourses_1 = __webpack_require__(/*! ./BBCourses */ "../node_modules/@stefanfortuin/blackboardlib-test/backend/BBIframeBackend/BBCourses.js");

var BBEmails_1 = __webpack_require__(/*! ./BBEmails */ "../node_modules/@stefanfortuin/blackboardlib-test/backend/BBIframeBackend/BBEmails.js");

var BBFiles_1 = __webpack_require__(/*! ./BBFiles */ "../node_modules/@stefanfortuin/blackboardlib-test/backend/BBIframeBackend/BBFiles.js");

var BBGradeColumns_1 = __webpack_require__(/*! ./BBGradeColumns */ "../node_modules/@stefanfortuin/blackboardlib-test/backend/BBIframeBackend/BBGradeColumns.js");

var BBGroups_1 = __webpack_require__(/*! ./BBGroups */ "../node_modules/@stefanfortuin/blackboardlib-test/backend/BBIframeBackend/BBGroups.js");

var BBMisc_1 = __webpack_require__(/*! ./BBMisc */ "../node_modules/@stefanfortuin/blackboardlib-test/backend/BBIframeBackend/BBMisc.js");

var BBUsers_1 = __webpack_require__(/*! ./BBUsers */ "../node_modules/@stefanfortuin/blackboardlib-test/backend/BBIframeBackend/BBUsers.js");

var BBIframeBackend =
/*#__PURE__*/
function (_common_1$BBAbstractB) {
  _inherits(BBIframeBackend, _common_1$BBAbstractB);

  function BBIframeBackend(connectionManager) {
    var _this;

    _classCallCheck(this, BBIframeBackend);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(BBIframeBackend).call(this));
    _this.courses = new BBCourses_1["default"]('courses', _assertThisInitialized(_this));
    _this.email = new BBEmails_1["default"]('email', _assertThisInitialized(_this));
    _this.files = new BBFiles_1["default"]('files', _assertThisInitialized(_this));
    _this.gradeColumns = new BBGradeColumns_1["default"]('gradeColumns', _assertThisInitialized(_this));
    _this.groups = new BBGroups_1["default"]('groups', _assertThisInitialized(_this));
    _this.misc = new BBMisc_1["default"]('misc', _assertThisInitialized(_this));
    _this.users = new BBUsers_1["default"]('users', _assertThisInitialized(_this));

    if (!_this.checkIfInsideIframe()) {
      throw new Error("BBIframeBackend not loaded inside Iframe");
    }

    if (!connectionManager) {
      connectionManager = new common_1.WindowConnectionManager(window.parent);
    }

    _this.connectionManager = connectionManager;
    return _this;
  }

  _createClass(BBIframeBackend, [{
    key: "checkIfInsideIframe",
    value: function checkIfInsideIframe() {
      try {
        return window.self !== window.top;
      } catch (e) {
        return true;
      }
    }
  }, {
    key: "sendMessageThroughConnectionManager",
    value: function sendMessageThroughConnectionManager(category, methodSignature) {
      var _this2 = this;

      var parameters = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      return new Promise(function (resolve, reject) {
        _this2.connectionManager.sendMessage(new common_1.WindowFunctionCall(category, methodSignature, parameters), function (returnObject) {
          resolve(returnObject);
        });
      });
    }
  }]);

  return BBIframeBackend;
}(common_1.BBAbstractBackend);

exports["default"] = BBIframeBackend;

/***/ }),

/***/ "../node_modules/@stefanfortuin/blackboardlib-test/backend/BBNativeBackend/BBCourses.js":
/*!**********************************************************************************************!*\
  !*** ../node_modules/@stefanfortuin/blackboardlib-test/backend/BBNativeBackend/BBCourses.js ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

Object.defineProperty(exports, "__esModule", {
  value: true
});

var common_1 = __webpack_require__(/*! ../../common */ "../node_modules/@stefanfortuin/blackboardlib-test/common/index.js");

var courses_1 = __webpack_require__(/*! ../../common/BBAbstractBackend/courses */ "../node_modules/@stefanfortuin/blackboardlib-test/common/BBAbstractBackend/courses.js");

var BBCourses =
/*#__PURE__*/
function (_courses_1$default) {
  _inherits(BBCourses, _courses_1$default);

  function BBCourses() {
    _classCallCheck(this, BBCourses);

    return _possibleConstructorReturn(this, _getPrototypeOf(BBCourses).apply(this, arguments));
  }

  _createClass(BBCourses, [{
    key: "getEnrolledCourses",
    value: function getEnrolledCourses(parameters) {
      var path = "/learn/api/public/v1/users/" + parameters.userId + "/courses?offset=" + parameters.offset;
      return new Promise(function (resolve, reject) {
        common_1.HTTPRequest.getAsync(path).then(function (response) {
          var allCourseInformation = JSON.parse(response);
          var responseInfo = new Array();
          allCourseInformation.results.forEach(function (result) {
            var resultObject = {
              id: result.courseId
            };
            responseInfo.push(resultObject);
          });
          resolve(responseInfo);
        });
      });
    }
  }, {
    key: "getCourseInformation",
    value: function getCourseInformation(parameters) {
      var path = "/learn/api/public/v1/courses/" + parameters.courseId;
      return new Promise(function (resolve, reject) {
        common_1.HTTPRequest.getAsync(path).then(function (response) {
          var courseInformation = JSON.parse(response);
          var resultObject = {
            id: courseInformation.id,
            uuid: courseInformation.uuid,
            externalId: courseInformation.externalId,
            dataSourceId: courseInformation.dataSourceId,
            courseId: courseInformation.courseId,
            name: courseInformation.name,
            description: courseInformation.description,
            created: courseInformation.created,
            organization: courseInformation.organization,
            ultraStatus: courseInformation.ultraStatus,
            accessCode: courseInformation.enrollment.accessCode,
            allowGuests: courseInformation.allowGuests,
            available: courseInformation.availability.available,
            duration: courseInformation.availability.duration.type,
            enrollment: courseInformation.enrollment.type,
            hasChildren: courseInformation.hasChildren,
            parentId: courseInformation.parentId,
            locale: courseInformation.locale.force,
            readOnly: courseInformation.readOnly
          };
          resolve(resultObject);
        });
      });
    }
  }, {
    key: "postCourse",
    value: function postCourse() {
      var path = "/learn/api/public/v1/courses/";
      return new Promise(function (resolve, reject) {
        common_1.HTTPRequest.postAsync(path, null).then(function (response) {
          resolve(response);
        });
      });
    }
  }, {
    key: "deleteCourse",
    value: function deleteCourse(parameters) {
      var path = "/learn/api/public/v1/courses/" + parameters.courseId;
      return new Promise(function (resolve, reject) {
        common_1.HTTPRequest.deleteAsync(path, null).then(function (response) {
          resolve(response);
        });
      });
    }
  }, {
    key: "patchCourse",
    value: function patchCourse(parameters) {
      var path = "/learn/api/public/v1/courses/" + parameters.courseId;
      return new Promise(function (resolve, reject) {
        common_1.HTTPRequest.patchAsync(path, null).then(function (response) {
          resolve(response);
        });
      });
    }
  }, {
    key: "getCourseContents",
    value: function getCourseContents(parameters) {
      var path = "/learn/api/public/v1/courses/" + parameters.courseId + "/contents";
      return new Promise(function (resolve, reject) {
        common_1.HTTPRequest.getAsync(path).then(function (response) {
          var allCourseContents = JSON.parse(response);
          var responseInfo = new Array();
          allCourseContents.results.forEach(function (result) {
            var resultObject = {
              allowGuests: result.availability.allowGuests,
              available: result.availability.available,
              body: result.body,
              created: result.created,
              description: result.description,
              hasAssociatedGroups: result.hasAssociatedGroups,
              hasChildren: result.hasChildren,
              hasGradebookColumns: result.hasGradebookColumns,
              id: result.id,
              parentId: result.parentId,
              position: result.position,
              title: result.title
            };
            responseInfo.push(resultObject);
          });
          resolve(responseInfo);
        });
      });
    }
  }, {
    key: "postCourseContent",
    value: function postCourseContent(parameters) {
      var path = "/learn/api/public/v1/courses/" + parameters.courseId + '/contents';
      return new Promise(function (resolve, reject) {
        common_1.HTTPRequest.postAsync(path, null).then(function (response) {
          resolve(response);
        });
      });
    }
  }, {
    key: "deleteCourseContent",
    value: function deleteCourseContent(parameters) {
      var path = "/learn/api/public/v1/courses/" + parameters.courseId + '/contents/' + parameters.contentId;
      return new Promise(function (resolve, reject) {
        common_1.HTTPRequest.deleteAsync(path, null).then(function (response) {
          resolve(response);
        });
      });
    }
  }, {
    key: "patchCourseContent",
    value: function patchCourseContent(parameters) {
      var path = "/learn/api/public/v1/courses/" + parameters.courseId + "/contents/" + parameters.contentId;
      return new Promise(function (resolve, reject) {
        common_1.HTTPRequest.patchAsync(path, null).then(function (response) {
          resolve(response);
        });
      });
    }
  }, {
    key: "getCourseContent",
    value: function getCourseContent(parameters) {
      var path = "/learn/api/public/v1/courses/" + parameters.courseId + "/contents/" + parameters.contentId;
      return new Promise(function (resolve, reject) {
        common_1.HTTPRequest.getAsync(path).then(function (response) {
          var result = JSON.parse(response);
          var resultObject = {
            allowGuests: result.availability.allowGuests,
            available: result.availability.available,
            body: result.body,
            created: result.created,
            description: result.description,
            hasAssociatedGroups: result.hasAssociatedGroups,
            hasChildren: result.hasChildren,
            hasGradebookColumns: result.hasGradebookColumns,
            id: result.id,
            parentId: result.parentId,
            position: result.position,
            title: result.title
          };
          resolve(resultObject);
        });
      });
    }
  }, {
    key: "getCourseContentChildren",
    value: function getCourseContentChildren(parameters) {
      var path = "/learn/api/public/v1/courses/" + parameters.courseId + "/contents/" + parameters.contentId + '/children';
      return new Promise(function (resolve, reject) {
        common_1.HTTPRequest.getAsync(path).then(function (response) {
          var allCourseContents = JSON.parse(response);
          var responseInfo = new Array();
          allCourseContents.results.forEach(function (result) {
            var resultObject = {
              allowGuests: result.availability.allowGuests,
              available: result.availability.available,
              body: result.body,
              created: result.created,
              description: result.description,
              hasAssociatedGroups: result.hasAssociatedGroups,
              hasChildren: result.hasChildren,
              hasGradebookColumns: result.hasGradebookColumns,
              id: result.id,
              parentId: result.parentId,
              position: result.position,
              title: result.title
            };
            responseInfo.push(resultObject);
          });
          resolve(responseInfo);
        });
      });
    }
  }, {
    key: "postCourseContentChildren",
    value: function postCourseContentChildren(parameters) {
      var path = "/learn/api/public/v1/courses/" + parameters.courseId + "/contents/" + parameters.contentId + '/children';
      return new Promise(function (resolve, reject) {
        common_1.HTTPRequest.postAsync(path, null).then(function (response) {
          resolve(response);
        });
      });
    }
  }, {
    key: "getCourseChildren",
    value: function getCourseChildren(parameters) {
      var path = "/learn/api/public/v1/courses/" + parameters.courseId + "/children";
      return new Promise(function (resolve, reject) {
        common_1.HTTPRequest.getAsync(path).then(function (response) {
          var allCourseChildren = JSON.parse(response);
          var responseInfo = new Array();
          allCourseChildren.results.forEach(function (result) {
            var resultObject = {
              created: result.created,
              datasourceId: result.datasourceId,
              id: result.id
            };
            responseInfo.push(resultObject);
          });
          resolve(responseInfo);
        });
      });
    }
  }, {
    key: "getAssignmentCols",
    value: function getAssignmentCols(parameters) {
      var _this = this;

      var path = "/learn/api/public/v2/courses/" + parameters.courseId + "/gradebook/columns";
      return new Promise(function (resolve, reject) {
        common_1.HTTPRequest.getAsync(path).then(function (response) {
          var columns = JSON.parse(response).results;
          var result = [];
          var _iteratorNormalCompletion = true;
          var _didIteratorError = false;
          var _iteratorError = undefined;

          try {
            for (var _iterator = columns[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              var column = _step.value;
              result.push(_this.createIAssignment(column));
            }
          } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion && _iterator["return"] != null) {
                _iterator["return"]();
              }
            } finally {
              if (_didIteratorError) {
                throw _iteratorError;
              }
            }
          }

          resolve(result);
        });
      });
    }
  }, {
    key: "getAnnouncements",
    value: function getAnnouncements(parameters) {
      var _this2 = this;

      var path = "/webapps/blackboard/execute/announcement?method=search&context=course_entry&course_id=" + parameters.courseId + "&handle=announcements_entry&mode=view";
      return new Promise(function (resolve, reject) {
        common_1.HTTPRequest.getAsync(path).then(function (response) {
          var parser = new DOMParser();
          var parsedHtml = parser.parseFromString(response, 'text/html');
          var parsedAnnouncements = [];
          var announcements = parsedHtml.getElementById('announcementList').getElementsByTagName('li');
          var _iteratorNormalCompletion2 = true;
          var _didIteratorError2 = false;
          var _iteratorError2 = undefined;

          try {
            for (var _iterator2 = announcements[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
              var a = _step2.value;
              var information = {
                id: "",
                title: "",
                datePosted: "",
                postedBy: "",
                postedTo: "",
                content: ""
              };
              information.id = a.id;
              information.title = a.getElementsByTagName("h3")[0].innerText;
              var detailDiv = a.getElementsByClassName("details")[0];
              information.datePosted = detailDiv.getElementsByTagName("p")[0].getElementsByTagName("span")[0].innerHTML;
              information.content = detailDiv.getElementsByClassName("vtbegenerated")[0].getElementsByTagName("p")[0].innerHTML;
              parsedAnnouncements.push(_this2.createIAnnouncement(information));
            }
          } catch (err) {
            _didIteratorError2 = true;
            _iteratorError2 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
                _iterator2["return"]();
              }
            } finally {
              if (_didIteratorError2) {
                throw _iteratorError2;
              }
            }
          }

          resolve(parsedAnnouncements);
        });
      });
    }
  }, {
    key: "createIAssignment",
    value: function createIAssignment(information) {
      if (typeof information.availability !== "undefined") {
        return {
          attemptsAllowed: information.grading.attemptsAllowed,
          available: common_1.Utilities.stringToBoolean(information.availability.available),
          contentId: information.contentId,
          desc: information.description,
          due: information.grading.due,
          id: information.id,
          name: information.name,
          score: information.score.possible
        };
      } else {
        return {
          attemptsAllowed: information.grading.attemptsAllowed,
          available: null,
          contentId: information.contentId,
          desc: null,
          due: information.grading.due,
          id: information.id,
          name: information.name,
          score: information.score.possible
        };
      }
    }
  }, {
    key: "createIAnnouncement",
    value: function createIAnnouncement(information) {
      return {
        content: information.content,
        datePosted: information.datePosted,
        id: information.id,
        title: information.title
      };
    }
  }]);

  return BBCourses;
}(courses_1["default"]);

exports["default"] = BBCourses;

/***/ }),

/***/ "../node_modules/@stefanfortuin/blackboardlib-test/backend/BBNativeBackend/BBEmails.js":
/*!*********************************************************************************************!*\
  !*** ../node_modules/@stefanfortuin/blackboardlib-test/backend/BBNativeBackend/BBEmails.js ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

Object.defineProperty(exports, "__esModule", {
  value: true
});

var common_1 = __webpack_require__(/*! ../../common */ "../node_modules/@stefanfortuin/blackboardlib-test/common/index.js");

var email_1 = __webpack_require__(/*! ../../common/BBAbstractBackend/email */ "../node_modules/@stefanfortuin/blackboardlib-test/common/BBAbstractBackend/email.js");

var BBEmails =
/*#__PURE__*/
function (_email_1$default) {
  _inherits(BBEmails, _email_1$default);

  function BBEmails() {
    _classCallCheck(this, BBEmails);

    return _possibleConstructorReturn(this, _getPrototypeOf(BBEmails).apply(this, arguments));
  }

  _createClass(BBEmails, [{
    key: "sendMail",
    value: function sendMail(parameters) {
      var basePath = '/webapps/blackboard/execute';
      var commonParameters = "?navItem=" + parameters.recipients.navItem + "&course_id=" + parameters.courseId;
      var formPath = basePath + '/displayEmail' + commonParameters;
      var sendPath = basePath + '/sendEmail' + commonParameters;
      return new Promise(function (resolve, reject) {
        common_1.HTTPRequest.getAsync(formPath).then(function (response) {
          var parser = new DOMParser();
          var dom = parser.parseFromString(response, 'text/html');
          var securityNonce = common_1.Utilities.getNonceFromForm(dom, 'emailForm');
          var formData = new FormData();
          formData.append('blackboard.platform.security.NonceUtil.nonce', securityNonce);
          formData.append('navItem', parameters.recipients.navItem);
          formData.append('messagetext_f', '');
          formData.append('messagetext_w', '');
          formData.append('messagetype', '');
          formData.append('textbox_prefix', 'messagetext');
          formData.append('course_id', parameters.courseId);
          formData.append('subject', parameters.subject);
          formData.append('messagetext', parameters.body);

          if (parameters.recipients.targets !== '') {
            formData.append('multiselect_right_values', parameters.recipients.targets);
          }

          if (parameters.attachments.length > 0) {
            for (var i = 0; i < parameters.attachments.length; i++) {
              var name = 'email_file_' + (i + 1).toString();
              formData.append(name, parameters.attachments[i]);
            }
          }

          if (parameters.returnRecipient) {
            formData.append('prependRecipientNames', 'on');
          }

          return common_1.HTTPRequest.postAsync(sendPath, formData);
        }).then(function (response) {
          var resultObject = {
            success: true
          };
          resolve(resultObject);
        });
      });
    }
  }]);

  return BBEmails;
}(email_1["default"]);

exports["default"] = BBEmails;

/***/ }),

/***/ "../node_modules/@stefanfortuin/blackboardlib-test/backend/BBNativeBackend/BBFiles.js":
/*!********************************************************************************************!*\
  !*** ../node_modules/@stefanfortuin/blackboardlib-test/backend/BBNativeBackend/BBFiles.js ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

Object.defineProperty(exports, "__esModule", {
  value: true
});

var common_1 = __webpack_require__(/*! ../../common */ "../node_modules/@stefanfortuin/blackboardlib-test/common/index.js");

var files_1 = __webpack_require__(/*! ../../common/BBAbstractBackend/files */ "../node_modules/@stefanfortuin/blackboardlib-test/common/BBAbstractBackend/files.js");

var BBFiles =
/*#__PURE__*/
function (_files_1$default) {
  _inherits(BBFiles, _files_1$default);

  function BBFiles() {
    _classCallCheck(this, BBFiles);

    return _possibleConstructorReturn(this, _getPrototypeOf(BBFiles).apply(this, arguments));
  }

  _createClass(BBFiles, [{
    key: "getFileInfo",
    value: function getFileInfo(parameters) {
      throw new Error("Method not implemented.");
    }
  }, {
    key: "createFolder",
    value: function createFolder(parameters) {
      return new Promise(function (resolve, reject) {
        var uniqPath = "/webapps/cmsmain/webui/courses/" + parameters.courseId + "?action=frameset&subaction=view&course_id=" + parameters.id;
        common_1.HTTPRequest.getAsync(uniqPath).then(function (response) {
          var parser = new DOMParser();
          var dom = parser.parseFromString(response, 'text/html');
          var uniqDiv = dom.getElementById("addFolderForm");
          var uniqForm = uniqDiv.firstElementChild;
          var uniqExpr = /uniq=(.*)&c/g;
          var uniq = uniqExpr.exec(uniqForm.action)[1];
          var nonceExpr = /nonce=(.*)/g;
          var nonce = nonceExpr.exec(uniqForm.action)[1];
          var path = "/webapps/cmsmain/webui/courses/" + parameters.courseId + "?action=upload&subaction=createdirectory&uniq=" + uniq + "&course_id=" + parameters.id + "&blackboard.platform.security.NonceUtil.nonce=" + nonce;
          common_1.HTTPRequest.postAsync(path, 'NEWDIR1=' + parameters.name, 'form');
        });
      });
    }
  }, {
    key: "fileAction",
    value: function fileAction(parameters, a1, action) {
      return new Promise(function (resolve, reject) {
        var path = "/webapps/cmsmain/webui/courses/" + parameters.courseId;
        if (action == 'zip') path += '.zip';
        var noncePath = "/webapps/cmsmain/webui/courses/" + parameters.courseId + "?action=frameset&subaction=view&course_id=" + parameters.id;
        common_1.HTTPRequest.getAsync(noncePath).then(function (response) {
          var parser = new DOMParser();
          var dom = parser.parseFromString(response, 'text/html');
          var nonceForm = dom.getElementById("filesForm");
          var nonceInput = nonceForm.children[0];
          common_1.HTTPRequest.postAsync(path, "blackboard.platform.security.NonceUtil.nonce=" + nonceInput.value + "&a1=" + a1 + "&subaction=" + action + "&course_id=" + parameters.id + "&restore_trash=false&webuipath=%2Fwebapps%2Fcmsmain%2Fwebui&selectAllFromList=false&file0=%2Fcourses%2F" + parameters.courseId + "%2F" + parameters.name, 'form');
        });
      });
    }
  }, {
    key: "publishFile",
    value: function publishFile(parameters) {
      return new Promise(function (resolve, reject) {
        var path = "/webapps/cmsmain/webui/courses/" + parameters.courseId + "?action=upload&subaction=uploadFiles&uniq=9szxf3&gobackto=%2Fcourses%2F" + parameters.courseId;
        common_1.HTTPRequest.getAsync(path).then(function (response) {
          var parser = new DOMParser();
          var dom = parser.parseFromString(response, 'text/html');
          var form = dom.getElementsByName("fileUpload")[0];
          var formData = new FormData();
          var securityNonce = common_1.Utilities.getNonceFromForm(dom, 'fileUpload');
          formData.append('blackboard.platform.security.NonceUtil.nonce', securityNonce);
          formData.append('targetPath', '/courses/' + parameters.courseId);
          formData.append('view', '');
          formData.append('isLightbox', 'false');
          formData.append('newFile_attachmentType', 'L');
          formData.append('newFile_artifactFileId', undefined);
          formData.append('newFile_artifactType', undefined);
          formData.append('newFile_artifactTypeResourceKey', undefined);
          formData.append('newFile_linkTitle', parameters.name);
          formData.append('updateCommentType', 'updateCommentType');
          formData.append('updateVersionsSetting', 'updateVersionsSetting');
          formData.append('updateTrackingSetting', 'updateTrackingSetting');
          formData.append('newFilefilePickerLastInput', 'dummyValue');
          formData.append('newFile_LocalFile0', parameters.body);
          common_1.HTTPRequest.postAsync(form.action + "&course_id=" + parameters.id, formData);
        });
      });
    }
  }, {
    key: "deleteFile",
    value: function deleteFile(parameters) {
      return this.fileAction(parameters, 'multiple', 'delete');
    }
  }, {
    key: "downloadFile",
    value: function downloadFile(parameters) {
      return this.fileAction(parameters, 'download', 'zip');
    }
  }, {
    key: "setPermissions",
    value: function setPermissions(parameters) {
      return new Promise(function (resolve, reject) {
        var path = "/webapps/cmsmain/webui/courses/" + parameters.courseId + "/" + parameters.name + "?action=permissions&subaction=printfindcourseuserlist&uniq=uz57o3&gobackto=dirList-&course_id=" + parameters.id;
        common_1.HTTPRequest.getAsync(path).then(function (response) {
          var parser = new DOMParser();
          var dom = parser.parseFromString(response, 'text/html');
          var form = dom.getElementsByName("addUserListForm")[0];
          var formString = '';
          var securityNonce = common_1.Utilities.getNonceFromForm(dom, 'addUserListForm');
          formString += 'blackboard.platform.security.NonceUtil.nonce=' + securityNonce;
          formString += '&course_ids=' + parameters.courseId;
          formString += '&bAllowEveryone=' + parameters.bAllowEveryone;
          formString += '&B=' + parameters.B;
          formString += '&G=' + parameters.G;
          formString += '&P=' + parameters.P;
          formString += '&S=' + parameters.S;
          formString += '&T=' + parameters.T;
          formString += '&U=' + parameters.U;
          formString += '&bAllowRead=' + parameters.bAllowRead;
          formString += '&bAllowWrite=' + parameters.bAllowWrite;
          formString += '&bAllowDelete=' + parameters.bAllowDelete;
          formString += '&bAllowManage=' + parameters.bAllowManage;
          formString += '&bottom_Submit=' + 'Submit';
          common_1.HTTPRequest.postAsync(form.action, formString, 'form');
        });
      });
    }
  }, {
    key: "uploadFile",
    value: function uploadFile(parameters) {
      var path = "/learn/api/public/v1/uploads";
      var formData = new FormData();
      formData.append('file', parameters.file);
      return new Promise(function (resolve, reject) {
        common_1.HTTPRequest.postAsync(path, formData).then(function (response) {
          var id = JSON.parse(response);
          var result = {
            id: id.id
          };
          resolve(result);
        });
      });
    }
  }]);

  return BBFiles;
}(files_1["default"]);

exports["default"] = BBFiles;

/***/ }),

/***/ "../node_modules/@stefanfortuin/blackboardlib-test/backend/BBNativeBackend/BBGradeColumns.js":
/*!***************************************************************************************************!*\
  !*** ../node_modules/@stefanfortuin/blackboardlib-test/backend/BBNativeBackend/BBGradeColumns.js ***!
  \***************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

Object.defineProperty(exports, "__esModule", {
  value: true
});

var common_1 = __webpack_require__(/*! ../../common */ "../node_modules/@stefanfortuin/blackboardlib-test/common/index.js");

var gradeColumns_1 = __webpack_require__(/*! ../../common/BBAbstractBackend/gradeColumns */ "../node_modules/@stefanfortuin/blackboardlib-test/common/BBAbstractBackend/gradeColumns.js");

var BBGradeColumns =
/*#__PURE__*/
function (_gradeColumns_1$defau) {
  _inherits(BBGradeColumns, _gradeColumns_1$defau);

  function BBGradeColumns() {
    _classCallCheck(this, BBGradeColumns);

    return _possibleConstructorReturn(this, _getPrototypeOf(BBGradeColumns).apply(this, arguments));
  }

  _createClass(BBGradeColumns, [{
    key: "getAssignmentCol",
    value: function getAssignmentCol(parameters) {
      var _this = this;

      var path = "/learn/api/public/v2/courses/" + parameters.courseId + "/gradebook/columns/" + parameters.columnId;
      return new Promise(function (resolve, reject) {
        common_1.HTTPRequest.getAsync(path).then(function (response) {
          var column = JSON.parse(response);

          var result = _this.createIAssignment(column);

          resolve(result);
        });
      });
    }
  }, {
    key: "deleteAssignmentCol",
    value: function deleteAssignmentCol(parameters) {
      var path = "/webapps/gradebook/do/instructor/deleteItem?course_id=" + parameters.courseId;
      return new Promise(function (resolve, reject) {
        common_1.Utilities.getNonceFromCourseId(parameters.courseId).then(function (nonce) {
          var formData = new FormData();
          formData.append('itemId', parameters.columnId);
          formData.append('blackboard.platform.security.NonceUtil.nonce', nonce);
          common_1.HTTPRequest.postAsync(path, formData).then(function (response) {
            var result = {
              success: true
            };
            resolve(result);
          });
        });
      });
    }
  }, {
    key: "createAssignmentAttempt",
    value: function createAssignmentAttempt(parameters) {
      var _this2 = this;

      var path = "/learn/api/public/v2/courses/" + parameters.courseId + "/gradebook/columns/" + parameters.columnId + "/attempts";
      var formData = new FormData();
      formData.append('attemptInput', parameters.attemptInput);
      return new Promise(function (resolve, reject) {
        common_1.HTTPRequest.postAsync(path, formData).then(function (response) {
          var attempt = JSON.parse(response);

          var result = _this2.createIAssignmentAttempt(attempt);

          resolve(result);
        });
      });
    }
  }, {
    key: "updateAssignmentAttempt",
    value: function updateAssignmentAttempt(parameters) {
      var _this3 = this;

      var path = "/learn/api/public/v2/courses/" + parameters.courseId + "/gradebook/columns/" + parameters.columnId + "/attempts/" + parameters.attemptId;
      var formData = new FormData();
      formData.append('attemptInput', parameters.attemptInput);
      return new Promise(function (resolve, reject) {
        common_1.HTTPRequest.postAsync(path, formData).then(function (response) {
          var attempt = JSON.parse(response);

          var result = _this3.createIAssignmentAttempt(attempt);

          resolve(result);
        });
      });
    }
  }, {
    key: "getAssignmentAttempt",
    value: function getAssignmentAttempt(parameters) {
      var _this4 = this;

      var path = "/learn/api/public/v2/courses/" + parameters.courseId + "/gradebook/columns/" + parameters.columnId + "/attempts/" + parameters.attemptId;
      return new Promise(function (resolve, reject) {
        common_1.HTTPRequest.getAsync(path).then(function (response) {
          var attempt = JSON.parse(response);

          var result = _this4.createIAssignmentAttempt(attempt);

          resolve(result);
        });
      });
    }
  }, {
    key: "getAssignmentAttempts",
    value: function getAssignmentAttempts(parameters) {
      var _this5 = this;

      var path = "/learn/api/public/v2/courses/" + parameters.courseId + "/gradebook/columns/" + parameters.columnId + "/attempts";
      return new Promise(function (resolve, reject) {
        common_1.HTTPRequest.getAsync(path).then(function (response) {
          var attempts = JSON.parse(response).results;
          var result = [];
          var _iteratorNormalCompletion = true;
          var _didIteratorError = false;
          var _iteratorError = undefined;

          try {
            for (var _iterator = attempts[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              var attempt = _step.value;
              result.push(_this5.createIAssignmentAttempt(attempt));
            }
          } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion && _iterator["return"] != null) {
                _iterator["return"]();
              }
            } finally {
              if (_didIteratorError) {
                throw _iteratorError;
              }
            }
          }

          resolve(result);
        });
      });
    }
  }, {
    key: "getFilesFromAssignmentAttempt",
    value: function getFilesFromAssignmentAttempt(parameters) {
      var _this6 = this;

      var path = "/learn/api/public/v1/courses/" + parameters.courseId + "/gradebook/attempts/" + parameters.attemptId + "/files";
      return new Promise(function (resolve, reject) {
        common_1.HTTPRequest.getAsync(path).then(function (response) {
          var files = JSON.parse(response).results;
          var result = [];
          var _iteratorNormalCompletion2 = true;
          var _didIteratorError2 = false;
          var _iteratorError2 = undefined;

          try {
            for (var _iterator2 = files[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
              var file = _step2.value;
              result.push(_this6.createIAssignmentAttemptFile(file));
            }
          } catch (err) {
            _didIteratorError2 = true;
            _iteratorError2 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
                _iterator2["return"]();
              }
            } finally {
              if (_didIteratorError2) {
                throw _iteratorError2;
              }
            }
          }

          resolve(result);
        });
      });
    }
  }, {
    key: "deleteFileFromAssignmentAttempt",
    value: function deleteFileFromAssignmentAttempt(parameters) {
      var path = "/learn/api/public/v1/courses/" + parameters.courseId + "/gradebook/attempts/" + parameters.attemptId + "/files/" + parameters.attemptFileId;
      return new Promise(function (resolve, reject) {
        common_1.HTTPRequest.deleteAsync(path).then(function (response) {
          var result = {
            success: true
          };
          resolve(result);
        });
      });
    }
  }, {
    key: "getFileFromAssignmentAttempt",
    value: function getFileFromAssignmentAttempt(parameters) {
      var _this7 = this;

      var path = "/learn/api/public/v1/courses/" + parameters.courseId + "/gradebook/attempts/" + parameters.attemptId + "/files/" + parameters.attemptFileId;
      return new Promise(function (resolve, reject) {
        common_1.HTTPRequest.getAsync(path).then(function (response) {
          var file = JSON.parse(response);

          var result = _this7.createIAssignmentAttemptFile(file);

          resolve(result);
        });
      });
    }
  }, {
    key: "downloadFileFromAssignmentAttempt",
    value: function downloadFileFromAssignmentAttempt(parameters) {
      var _this8 = this;

      var path = "/learn/api/public/v1/courses/" + parameters.courseId + "/gradebook/attempts/" + parameters.attemptId + "/files/" + parameters.attemptFileId + "/download";
      return new Promise(function (resolve, reject) {
        Promise.all([_this8.getFileFromAssignmentAttempt(parameters), common_1.HTTPRequest.downloadAsync(path)]).then(function (responses) {
          var fileInfo = responses[0];
          var blob = responses[1];
          var file = new File([blob], fileInfo.name);
          resolve(file);
        });
      });
    }
  }, {
    key: "addFileToAssignmentAttempt",
    value: function addFileToAssignmentAttempt(parameters) {
      var _this9 = this;

      var path = "/learn/api/public/v1/courses/" + parameters.courseId + "/gradebook/attempts/" + parameters.attemptId + "/files";
      var formData = new FormData();
      formData.append('attemptFileTOPubV1', parameters.fileId);
      return new Promise(function (resolve, reject) {
        common_1.HTTPRequest.postAsync(path, formData).then(function (response) {
          var file = JSON.parse(response);

          var result = _this9.createIAssignmentAttemptFile(file);

          resolve(result);
        });
      });
    }
  }, {
    key: "getUserGrades",
    value: function getUserGrades(parameters) {
      var path = "/learn/api/public/v2/courses/" + parameters.courseId + "/gradebook/users/" + parameters.userId;
      return new Promise(function (resolve, reject) {
        common_1.HTTPRequest.getAsync(path).then(function (response) {
          var results = JSON.parse(response).results;
          var grades = [];
          var _iteratorNormalCompletion3 = true;
          var _didIteratorError3 = false;
          var _iteratorError3 = undefined;

          try {
            for (var _iterator3 = results[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
              var result = _step3.value;
              grades.push({
                columnId: result.columnId,
                feedback: result.feedback,
                notes: result.notes,
                score: result.score,
                text: result.text
              });
            }
          } catch (err) {
            _didIteratorError3 = true;
            _iteratorError3 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion3 && _iterator3["return"] != null) {
                _iterator3["return"]();
              }
            } finally {
              if (_didIteratorError3) {
                throw _iteratorError3;
              }
            }
          }

          resolve(grades);
        });
      });
    }
  }, {
    key: "createIAssignmentAttemptFile",
    value: function createIAssignmentAttemptFile(information) {
      return {
        id: information.id,
        name: information.name,
        url: information.viewUrl
      };
    }
  }, {
    key: "createIAssignmentAttempt",
    value: function createIAssignmentAttempt(information) {
      var score = typeof information.displayGrade !== "undefined" ? information.displayGrade.score : information.score;
      return {
        created: information.created,
        feedback: information.feedback,
        groupAttemptId: information.groupAttemptId,
        id: information.id,
        notes: information.notes,
        score: score,
        status: information.status,
        studentComments: information.studentComments,
        studentSubmission: information.studentSubmission,
        text: information.text,
        userId: information.userId
      };
    }
  }, {
    key: "createIAssignment",
    value: function createIAssignment(information) {
      if (typeof information.availability !== "undefined") {
        return {
          attemptsAllowed: information.grading.attemptsAllowed,
          available: common_1.Utilities.stringToBoolean(information.availability.available),
          contentId: information.contentId,
          desc: information.description,
          due: information.grading.due,
          id: information.id,
          name: information.name,
          score: information.score.possible
        };
      } else {
        return {
          attemptsAllowed: information.grading.attemptsAllowed,
          available: true,
          contentId: information.contentId,
          desc: "",
          due: information.grading.due,
          id: information.id,
          name: information.name,
          score: information.score.possible
        };
      }
    }
  }]);

  return BBGradeColumns;
}(gradeColumns_1["default"]);

exports["default"] = BBGradeColumns;

/***/ }),

/***/ "../node_modules/@stefanfortuin/blackboardlib-test/backend/BBNativeBackend/BBGroups.js":
/*!*********************************************************************************************!*\
  !*** ../node_modules/@stefanfortuin/blackboardlib-test/backend/BBNativeBackend/BBGroups.js ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

Object.defineProperty(exports, "__esModule", {
  value: true
});

var common_1 = __webpack_require__(/*! ../../common */ "../node_modules/@stefanfortuin/blackboardlib-test/common/index.js");

var groups_1 = __webpack_require__(/*! ../../common/BBAbstractBackend/groups */ "../node_modules/@stefanfortuin/blackboardlib-test/common/BBAbstractBackend/groups.js");

var BBGroups =
/*#__PURE__*/
function (_groups_1$default) {
  _inherits(BBGroups, _groups_1$default);

  function BBGroups() {
    _classCallCheck(this, BBGroups);

    return _possibleConstructorReturn(this, _getPrototypeOf(BBGroups).apply(this, arguments));
  }

  _createClass(BBGroups, [{
    key: "getGroups",
    value: function getGroups(parameters) {
      var path = "/learn/api/public/v1/courses/" + parameters.courseId + "/groups";
      return new Promise(function (resolve, reject) {
        common_1.HTTPRequest.getAsync(path).then(function (response) {
          var allGroupInformation = JSON.parse(response);
          var responseInfo = new Array();
          allGroupInformation.results.forEach(function (result) {
            var resultObject = {
              id: result.id,
              name: result.name,
              desc: result.description
            };
            responseInfo.push(resultObject);
          });
          resolve(responseInfo);
        });
      });
    }
  }]);

  return BBGroups;
}(groups_1["default"]);

exports["default"] = BBGroups;

/***/ }),

/***/ "../node_modules/@stefanfortuin/blackboardlib-test/backend/BBNativeBackend/BBMisc.js":
/*!*******************************************************************************************!*\
  !*** ../node_modules/@stefanfortuin/blackboardlib-test/backend/BBNativeBackend/BBMisc.js ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

Object.defineProperty(exports, "__esModule", {
  value: true
});

var misc_1 = __webpack_require__(/*! ../../common/BBAbstractBackend/misc */ "../node_modules/@stefanfortuin/blackboardlib-test/common/BBAbstractBackend/misc.js");

var BBMisc =
/*#__PURE__*/
function (_misc_1$default) {
  _inherits(BBMisc, _misc_1$default);

  function BBMisc() {
    _classCallCheck(this, BBMisc);

    return _possibleConstructorReturn(this, _getPrototypeOf(BBMisc).apply(this, arguments));
  }

  _createClass(BBMisc, [{
    key: "getBlackboardDomain",
    value: function getBlackboardDomain() {
      throw new Error("Method not implemented.");
    }
  }]);

  return BBMisc;
}(misc_1["default"]);

exports["default"] = BBMisc;

/***/ }),

/***/ "../node_modules/@stefanfortuin/blackboardlib-test/backend/BBNativeBackend/BBUsers.js":
/*!********************************************************************************************!*\
  !*** ../node_modules/@stefanfortuin/blackboardlib-test/backend/BBNativeBackend/BBUsers.js ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

Object.defineProperty(exports, "__esModule", {
  value: true
});

var common_1 = __webpack_require__(/*! ../../common */ "../node_modules/@stefanfortuin/blackboardlib-test/common/index.js");

var users_1 = __webpack_require__(/*! ../../common/BBAbstractBackend/users */ "../node_modules/@stefanfortuin/blackboardlib-test/common/BBAbstractBackend/users.js");

var BBUsers =
/*#__PURE__*/
function (_users_1$default) {
  _inherits(BBUsers, _users_1$default);

  function BBUsers() {
    _classCallCheck(this, BBUsers);

    return _possibleConstructorReturn(this, _getPrototypeOf(BBUsers).apply(this, arguments));
  }

  _createClass(BBUsers, [{
    key: "getUserInfo",
    value: function getUserInfo(parameters) {
      if (parameters.userId) {
        var path = "/learn/api/public/v1/users/" + parameters.userId;
        return new Promise(function (resolve, reject) {
          common_1.HTTPRequest.getAsync(path).then(function (response) {
            var userJson = JSON.parse(response);
            var userObject = {
              email: userJson.contact.email,
              firstname: userJson.name.given,
              id: userJson.id,
              student: userJson.studentId,
              surname: userJson.name.family,
              username: userJson.userName
            };
            resolve(userObject);
          });
        });
      } else if (parameters.userName) {
        var _path = "/learn/api/public/v1/users?limit=1&userName=" + parameters.userName;

        return new Promise(function (resolve, reject) {
          common_1.HTTPRequest.getAsync(_path).then(function (response) {
            var userJson = JSON.parse(response);

            if (userJson.results.length < 1) {
              reject();
              return;
            }

            var userObject = {
              email: userJson.results[0].contact.email,
              firstname: userJson.results[0].name.given,
              id: userJson.results[0].id,
              student: userJson.results[0].studentId,
              surname: userJson.results[0].name.family,
              username: userJson.results[0].userName
            };
            resolve(userObject);
          });
        });
      }
    }
  }, {
    key: "getCurrentUserId",
    value: function getCurrentUserId(parameters) {
      var path = "/webapps/blackboard/execute/editUser?context=self_modify";
      var regex = new RegExp('user_id=(.+?(?="))');
      return new Promise(function (resolve, reject) {
        common_1.HTTPRequest.getAsync(path).then(function (response) {
          var userid = regex.exec(response);

          if (userid == null) {
            reject();
            return;
          }

          resolve(userid[1]);
        });
      });
    }
  }]);

  return BBUsers;
}(users_1["default"]);

exports["default"] = BBUsers;

/***/ }),

/***/ "../node_modules/@stefanfortuin/blackboardlib-test/backend/BBNativeBackend/index.js":
/*!******************************************************************************************!*\
  !*** ../node_modules/@stefanfortuin/blackboardlib-test/backend/BBNativeBackend/index.js ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

Object.defineProperty(exports, "__esModule", {
  value: true
});

var common_1 = __webpack_require__(/*! ../../common */ "../node_modules/@stefanfortuin/blackboardlib-test/common/index.js");

var BBCourses_1 = __webpack_require__(/*! ./BBCourses */ "../node_modules/@stefanfortuin/blackboardlib-test/backend/BBNativeBackend/BBCourses.js");

var BBEmails_1 = __webpack_require__(/*! ./BBEmails */ "../node_modules/@stefanfortuin/blackboardlib-test/backend/BBNativeBackend/BBEmails.js");

var BBFiles_1 = __webpack_require__(/*! ./BBFiles */ "../node_modules/@stefanfortuin/blackboardlib-test/backend/BBNativeBackend/BBFiles.js");

var BBGradeColumns_1 = __webpack_require__(/*! ./BBGradeColumns */ "../node_modules/@stefanfortuin/blackboardlib-test/backend/BBNativeBackend/BBGradeColumns.js");

var BBGroups_1 = __webpack_require__(/*! ./BBGroups */ "../node_modules/@stefanfortuin/blackboardlib-test/backend/BBNativeBackend/BBGroups.js");

var BBMisc_1 = __webpack_require__(/*! ./BBMisc */ "../node_modules/@stefanfortuin/blackboardlib-test/backend/BBNativeBackend/BBMisc.js");

var BBUsers_1 = __webpack_require__(/*! ./BBUsers */ "../node_modules/@stefanfortuin/blackboardlib-test/backend/BBNativeBackend/BBUsers.js");

var BBNativeBackend =
/*#__PURE__*/
function (_common_1$BBAbstractB) {
  _inherits(BBNativeBackend, _common_1$BBAbstractB);

  function BBNativeBackend() {
    var _this;

    _classCallCheck(this, BBNativeBackend);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(BBNativeBackend).apply(this, arguments));
    _this.courses = new BBCourses_1["default"]();
    _this.email = new BBEmails_1["default"]();
    _this.files = new BBFiles_1["default"]();
    _this.gradeColumns = new BBGradeColumns_1["default"]();
    _this.groups = new BBGroups_1["default"]();
    _this.misc = new BBMisc_1["default"]();
    _this.users = new BBUsers_1["default"]();
    return _this;
  }

  return BBNativeBackend;
}(common_1.BBAbstractBackend);

exports["default"] = BBNativeBackend;

/***/ }),

/***/ "../node_modules/@stefanfortuin/blackboardlib-test/backend/index.js":
/*!**************************************************************************!*\
  !*** ../node_modules/@stefanfortuin/blackboardlib-test/backend/index.js ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var BBIframeBackend_1 = __webpack_require__(/*! ./BBIframeBackend */ "../node_modules/@stefanfortuin/blackboardlib-test/backend/BBIframeBackend/index.js");

exports.BBIframeBackend = BBIframeBackend_1["default"];

var BBNativeBackend_1 = __webpack_require__(/*! ./BBNativeBackend */ "../node_modules/@stefanfortuin/blackboardlib-test/backend/BBNativeBackend/index.js");

exports.BBNativeBackend = BBNativeBackend_1["default"];

/***/ }),

/***/ "../node_modules/@stefanfortuin/blackboardlib-test/common/BBAbstractBackend/courses.js":
/*!*********************************************************************************************!*\
  !*** ../node_modules/@stefanfortuin/blackboardlib-test/common/BBAbstractBackend/courses.js ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Courses = function Courses() {
  _classCallCheck(this, Courses);
};

exports["default"] = Courses;

/***/ }),

/***/ "../node_modules/@stefanfortuin/blackboardlib-test/common/BBAbstractBackend/email.js":
/*!*******************************************************************************************!*\
  !*** ../node_modules/@stefanfortuin/blackboardlib-test/common/BBAbstractBackend/email.js ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Email = function Email() {
  _classCallCheck(this, Email);
};

exports["default"] = Email;

/***/ }),

/***/ "../node_modules/@stefanfortuin/blackboardlib-test/common/BBAbstractBackend/files.js":
/*!*******************************************************************************************!*\
  !*** ../node_modules/@stefanfortuin/blackboardlib-test/common/BBAbstractBackend/files.js ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Files = function Files() {
  _classCallCheck(this, Files);
};

exports["default"] = Files;

/***/ }),

/***/ "../node_modules/@stefanfortuin/blackboardlib-test/common/BBAbstractBackend/gradeColumns.js":
/*!**************************************************************************************************!*\
  !*** ../node_modules/@stefanfortuin/blackboardlib-test/common/BBAbstractBackend/gradeColumns.js ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", {
  value: true
});

var GradeColumns = function GradeColumns() {
  _classCallCheck(this, GradeColumns);
};

exports["default"] = GradeColumns;

/***/ }),

/***/ "../node_modules/@stefanfortuin/blackboardlib-test/common/BBAbstractBackend/groups.js":
/*!********************************************************************************************!*\
  !*** ../node_modules/@stefanfortuin/blackboardlib-test/common/BBAbstractBackend/groups.js ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Groups = function Groups() {
  _classCallCheck(this, Groups);
};

exports["default"] = Groups;

/***/ }),

/***/ "../node_modules/@stefanfortuin/blackboardlib-test/common/BBAbstractBackend/index.js":
/*!*******************************************************************************************!*\
  !*** ../node_modules/@stefanfortuin/blackboardlib-test/common/BBAbstractBackend/index.js ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", {
  value: true
});

var BBAbstractBackend = function BBAbstractBackend() {
  _classCallCheck(this, BBAbstractBackend);
};

exports["default"] = BBAbstractBackend;

/***/ }),

/***/ "../node_modules/@stefanfortuin/blackboardlib-test/common/BBAbstractBackend/misc.js":
/*!******************************************************************************************!*\
  !*** ../node_modules/@stefanfortuin/blackboardlib-test/common/BBAbstractBackend/misc.js ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Misc = function Misc() {
  _classCallCheck(this, Misc);
};

exports["default"] = Misc;

/***/ }),

/***/ "../node_modules/@stefanfortuin/blackboardlib-test/common/BBAbstractBackend/users.js":
/*!*******************************************************************************************!*\
  !*** ../node_modules/@stefanfortuin/blackboardlib-test/common/BBAbstractBackend/users.js ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Users = function Users() {
  _classCallCheck(this, Users);
};

exports["default"] = Users;

/***/ }),

/***/ "../node_modules/@stefanfortuin/blackboardlib-test/common/EmailRecipient.js":
/*!**********************************************************************************!*\
  !*** ../node_modules/@stefanfortuin/blackboardlib-test/common/EmailRecipient.js ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

Object.defineProperty(exports, "__esModule", {
  value: true
});

var EmailTarget_1 = __webpack_require__(/*! ./EmailTarget */ "../node_modules/@stefanfortuin/blackboardlib-test/common/EmailTarget.js");

var EmailRecipient =
/*#__PURE__*/
function () {
  _createClass(EmailRecipient, [{
    key: "type",
    get: function get() {
      return this._type;
    }
  }]);

  function EmailRecipient(targetType, targets) {
    var _this = this;

    _classCallCheck(this, EmailRecipient);

    if (targetType > 0 && !targets) {
      throw new Error("Email target type " + targetType.toString() + " requires that targets are specified.");
    }

    this._type = targetType;
    this.targets = [];

    if (targets) {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = targets[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var target = _step.value;
          target.getUserId().then(function (id) {
            _this.targets.push(id.toString());
          });
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    }
  }

  _createClass(EmailRecipient, [{
    key: "asTargetList",
    value: function asTargetList() {
      if (this.type === 0) {
        throw new BBError.InvalidOperationError("The target type " + this.type.toString() + " does not support specifying individual targets");
      }

      var list = '';
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = this.targets[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var target = _step2.value;
          list += target + ',';
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
            _iterator2["return"]();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      return list;
    }
  }, {
    key: "getNavItem",
    value: function getNavItem() {
      var postfix = '';

      switch (this.type) {
        case EmailTarget_1.EmailTarget.AllUsers:
          postfix = 'all_users';
          break;

        case EmailTarget_1.EmailTarget.AllGroups:
          postfix = 'all_groups';
          break;

        case EmailTarget_1.EmailTarget.AllTeachers:
          postfix = 'all_ta';
          break;

        case EmailTarget_1.EmailTarget.AllStudents:
          postfix = 'all_students';
          break;

        case EmailTarget_1.EmailTarget.AllCourseManagers:
          postfix = 'all_instructors';
          break;

        case EmailTarget_1.EmailTarget.AllObservers:
          postfix = 'all_observers';
          break;

        case EmailTarget_1.EmailTarget.SpecificUsers:
          postfix = 'select_students';
          break;

        case EmailTarget_1.EmailTarget.SpecificGroups:
          postfix = 'select_groups';
          break;

        case EmailTarget_1.EmailTarget.SpecificObservers:
          postfix = 'select_observers';
          break;
      }

      return 'cp_send_email_' + postfix;
    }
  }, {
    key: "asPlainObject",
    value: function asPlainObject() {
      return {
        navItem: this.getNavItem(),
        targets: this.type === 0 ? '' : this.asTargetList()
      };
    }
  }]);

  return EmailRecipient;
}();

exports["default"] = EmailRecipient;

/***/ }),

/***/ "../node_modules/@stefanfortuin/blackboardlib-test/common/EmailTarget.js":
/*!*******************************************************************************!*\
  !*** ../node_modules/@stefanfortuin/blackboardlib-test/common/EmailTarget.js ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var EmailTarget;

(function (EmailTarget) {
  EmailTarget[EmailTarget["AllUsers"] = 0] = "AllUsers";
  EmailTarget[EmailTarget["AllGroups"] = 0] = "AllGroups";
  EmailTarget[EmailTarget["AllTeachers"] = 0] = "AllTeachers";
  EmailTarget[EmailTarget["AllStudents"] = 0] = "AllStudents";
  EmailTarget[EmailTarget["AllCourseManagers"] = 0] = "AllCourseManagers";
  EmailTarget[EmailTarget["AllObservers"] = 0] = "AllObservers";
  EmailTarget[EmailTarget["SpecificUsers"] = 1] = "SpecificUsers";
  EmailTarget[EmailTarget["SpecificGroups"] = 1] = "SpecificGroups";
  EmailTarget[EmailTarget["SpecificObservers"] = 1] = "SpecificObservers";
})(EmailTarget = exports.EmailTarget || (exports.EmailTarget = {}));

/***/ }),

/***/ "../node_modules/@stefanfortuin/blackboardlib-test/common/HTTPRequest.js":
/*!*******************************************************************************!*\
  !*** ../node_modules/@stefanfortuin/blackboardlib-test/common/HTTPRequest.js ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

Object.defineProperty(exports, "__esModule", {
  value: true
});

var HTTPRequest =
/*#__PURE__*/
function () {
  function HTTPRequest() {
    _classCallCheck(this, HTTPRequest);
  }

  _createClass(HTTPRequest, null, [{
    key: "asyncRequest",
    value: function asyncRequest(type, url) {
      var body = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      var format = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'text';
      var getRequest = new XMLHttpRequest();
      getRequest.open(type, url);

      if (format == 'form') {
        getRequest.setRequestHeader('Content-type', 'application/x-www-form-urlencoded; charset=UTF-8');
      }

      return new Promise(function (resolve, reject) {
        getRequest.onload = function (ev) {
          if (getRequest.status === 200) {
            resolve(getRequest.responseText);
          } else {
            reject(getRequest.statusText);
          }
        };

        getRequest.onerror = function () {
          reject(getRequest.statusText);
        };

        getRequest.send(body);
      });
    }
  }, {
    key: "getAsync",
    value: function getAsync(url) {
      return this.asyncRequest("GET", url);
    }
  }, {
    key: "postAsync",
    value: function postAsync(url, formData) {
      var format = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'text';
      return this.asyncRequest("POST", url, formData, format);
    }
  }, {
    key: "deleteAsync",
    value: function deleteAsync(url) {
      var formData = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      return this.asyncRequest("DELETE", url, formData);
    }
  }, {
    key: "patchAsync",
    value: function patchAsync(url, formData) {
      return this.asyncRequest("PATCH", url, formData);
    }
  }, {
    key: "downloadAsync",
    value: function downloadAsync(url) {
      var getRequest = new XMLHttpRequest();
      getRequest.open("GET", url);
      return new Promise(function (resolve, reject) {
        getRequest.onload = function (ev) {
          if (getRequest.status === 200) {
            var blob = new Blob([getRequest.response]);
            resolve(blob);
          } else {
            reject(getRequest.statusText);
          }
        };

        getRequest.onerror = function () {
          reject(getRequest.statusText);
        };

        getRequest.send();
      });
    }
  }]);

  return HTTPRequest;
}();

exports["default"] = HTTPRequest;

/***/ }),

/***/ "../node_modules/@stefanfortuin/blackboardlib-test/common/Utilities.js":
/*!*****************************************************************************!*\
  !*** ../node_modules/@stefanfortuin/blackboardlib-test/common/Utilities.js ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

Object.defineProperty(exports, "__esModule", {
  value: true
});

var HTTPRequest_1 = __webpack_require__(/*! ./HTTPRequest */ "../node_modules/@stefanfortuin/blackboardlib-test/common/HTTPRequest.js");

var Utilities =
/*#__PURE__*/
function () {
  function Utilities() {
    _classCallCheck(this, Utilities);
  }

  _createClass(Utilities, null, [{
    key: "getNonceFromCourseId",
    value: function getNonceFromCourseId(courseId) {
      var noncePath = "/webapps/blackboard/execute/modulepage/view?course_id=" + courseId;
      return new Promise(function (resolve, reject) {
        HTTPRequest_1["default"].getAsync(noncePath).then(function (response) {
          var parser = new DOMParser();
          var dom = parser.parseFromString(response, 'text/html');
          var nonceObject = dom.getElementsByName("blackboard.platform.security.NonceUtil.nonce")[0];
          resolve(nonceObject.value);
        });
      });
    }
  }, {
    key: "getNonceFromForm",
    value: function getNonceFromForm(doc, formName) {
      var form = doc.getElementsByName(formName)[0];
      return form.elements["blackboard.platform.security.NonceUtil.nonce"].value || "";
    }
  }, {
    key: "encodeEntities",
    value: function encodeEntities(value) {
      return value.replace(/&/g, '&amp;').replace(Utilities.SURROGATE_PAIR_REGEXP, function (value) {
        var hi = value.charCodeAt(0);
        var low = value.charCodeAt(1);
        return '&#' + ((hi - 0xD800) * 0x400 + (low - 0xDC00) + 0x10000) + ';';
      }).replace(Utilities.NON_ALPHANUMERIC_REGEXP, function (value) {
        return '&#' + value.charCodeAt(0) + ';';
      }).replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }
  }, {
    key: "stringToBoolean",
    value: function stringToBoolean(value) {
      value = value.toLowerCase();
      return value === 'on' || value === 'true' || value === 'yes' || /^\s*[+-]?0*[1-9]/.test(value);
    }
  }]);

  return Utilities;
}();

Utilities.SURROGATE_PAIR_REGEXP = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g;
Utilities.NON_ALPHANUMERIC_REGEXP = /([^\#-~| |!])/g;
exports["default"] = Utilities;

/***/ }),

/***/ "../node_modules/@stefanfortuin/blackboardlib-test/common/WindowConnectionManager.js":
/*!*******************************************************************************************!*\
  !*** ../node_modules/@stefanfortuin/blackboardlib-test/common/WindowConnectionManager.js ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

Object.defineProperty(exports, "__esModule", {
  value: true
});

var WindowMessage_1 = __webpack_require__(/*! ./WindowMessage */ "../node_modules/@stefanfortuin/blackboardlib-test/common/WindowMessage.js");

var WindowConnectionManager =
/*#__PURE__*/
function () {
  function WindowConnectionManager(_window, backend) {
    _classCallCheck(this, WindowConnectionManager);

    this.window = _window;
    this.callbackList = {};
    this.backend = backend;
    var selfRef = this;
    window.addEventListener("message", function (event) {
      WindowConnectionManager.receiveMessage(selfRef, event);
    }, false);
  }

  _createClass(WindowConnectionManager, [{
    key: "sendMessage",
    value: function sendMessage(message, onReturn) {
      if (onReturn) {
        this.callbackList[message.uuid] = onReturn;
      }

      this.window.postMessage(message, "*");
    }
  }], [{
    key: "receiveMessage",
    value: function receiveMessage(connectionManager, event) {
      var message = WindowMessage_1.WindowMessageFactory.fromJson(event.data);

      if (message instanceof WindowMessage_1.WindowFunctionCall) {
        if (connectionManager.backend) {
          var fcMessage = message;
          connectionManager.backend[fcMessage.category][fcMessage.methodSignature](fcMessage.parameters).then(function (value) {
            connectionManager.sendMessage(new WindowMessage_1.WindowFunctionReturn(value, fcMessage.uuid));
          });
        }
      } else if (message instanceof WindowMessage_1.WindowFunctionReturn) {
        var frMessage = message;

        if (frMessage.uuid in connectionManager.callbackList) {
          connectionManager.callbackList[frMessage.uuid](frMessage.returnValue);
          delete connectionManager.callbackList[frMessage.uuid];
        }
      }
    }
  }]);

  return WindowConnectionManager;
}();

exports["default"] = WindowConnectionManager;

/***/ }),

/***/ "../node_modules/@stefanfortuin/blackboardlib-test/common/WindowMessage.js":
/*!*********************************************************************************!*\
  !*** ../node_modules/@stefanfortuin/blackboardlib-test/common/WindowMessage.js ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

Object.defineProperty(exports, "__esModule", {
  value: true
});
var WindowMessageType;

(function (WindowMessageType) {
  WindowMessageType[WindowMessageType["FUNCTION"] = 1] = "FUNCTION";
  WindowMessageType[WindowMessageType["RETURN"] = 2] = "RETURN";
})(WindowMessageType = exports.WindowMessageType || (exports.WindowMessageType = {}));

var WindowMessageFactory =
/*#__PURE__*/
function () {
  function WindowMessageFactory() {
    _classCallCheck(this, WindowMessageFactory);
  }

  _createClass(WindowMessageFactory, null, [{
    key: "fromJson",
    value: function fromJson(jsonObject) {
      var baseMessage = WindowMessage.fromJsonObject(jsonObject);

      switch (baseMessage.type) {
        case WindowMessageType.FUNCTION:
          return WindowFunctionCall.fromJsonObject(jsonObject);

        case WindowMessageType.RETURN:
          return WindowFunctionReturn.fromJsonObject(jsonObject);
      }

      throw new Error("No WindowMessage variant found for given data");
    }
  }]);

  return WindowMessageFactory;
}();

exports.WindowMessageFactory = WindowMessageFactory;

var WindowMessage =
/*#__PURE__*/
function () {
  function WindowMessage(type, uuid) {
    _classCallCheck(this, WindowMessage);

    if (uuid) {
      this.uuid = uuid;
    } else {
      this.uuid = WindowMessage.generateUuidv4();
    }

    this.type = type;
  }

  _createClass(WindowMessage, [{
    key: "toJsonObject",
    value: function toJsonObject() {
      var returnObject = {};
      returnObject[WindowMessage.UUID_ID] = this.uuid;
      returnObject[WindowMessage.TYPE_ID] = this.type;
      return returnObject;
    }
  }], [{
    key: "fromJsonObject",
    value: function fromJsonObject(jsonObject) {
      return new WindowMessage(jsonObject[WindowMessage.TYPE_ID], jsonObject[WindowMessage.UUID_ID]);
    }
  }, {
    key: "generateUuidv4",
    value: function generateUuidv4() {
      return ("" + 1e7 + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, function (c) {
        var cNum = parseInt(c);
        return (cNum ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> cNum / 4).toString(16);
      });
    }
  }]);

  return WindowMessage;
}();

WindowMessage.UUID_ID = "uuid";
WindowMessage.TYPE_ID = "type";
exports.WindowMessage = WindowMessage;

var WindowFunctionCall =
/*#__PURE__*/
function (_WindowMessage) {
  _inherits(WindowFunctionCall, _WindowMessage);

  function WindowFunctionCall(category, methodSignature, parameters, uuid) {
    var _this;

    _classCallCheck(this, WindowFunctionCall);

    if (uuid) {
      _this = _possibleConstructorReturn(this, _getPrototypeOf(WindowFunctionCall).call(this, WindowMessageType.FUNCTION, uuid));
    } else {
      _this = _possibleConstructorReturn(this, _getPrototypeOf(WindowFunctionCall).call(this, WindowMessageType.FUNCTION));
    }

    _this.methodSignature = methodSignature;
    _this.parameters = parameters;
    _this.category = category;
    return _possibleConstructorReturn(_this);
  }

  _createClass(WindowFunctionCall, [{
    key: "toJsonObject",
    value: function toJsonObject() {
      var s = _get(_getPrototypeOf(WindowFunctionCall.prototype), "toJsonObject", this).call(this);

      s[WindowFunctionCall.CATEGORY_ID] = this.category;
      s[WindowFunctionCall.METHOD_SIGNATURE_ID] = this.methodSignature;
      s[WindowFunctionCall.PARAMETERS_ID] = this.parameters;
      return s;
    }
  }, {
    key: "tryCall",
    value: function tryCall(backend, callBack) {
      return backend[this.methodSignature](this.parameters, callBack);
    }
  }], [{
    key: "fromJsonObject",
    value: function fromJsonObject(jsonObject) {
      var superImpl = WindowMessage.fromJsonObject(jsonObject);
      return new WindowFunctionCall(jsonObject[WindowFunctionCall.CATEGORY_ID], jsonObject[WindowFunctionCall.METHOD_SIGNATURE_ID], jsonObject[WindowFunctionCall.PARAMETERS_ID], superImpl.uuid);
    }
  }]);

  return WindowFunctionCall;
}(WindowMessage);

WindowFunctionCall.METHOD_SIGNATURE_ID = "methodSignature";
WindowFunctionCall.PARAMETERS_ID = "parameters";
WindowFunctionCall.CATEGORY_ID = "category";
exports.WindowFunctionCall = WindowFunctionCall;

var WindowFunctionReturn =
/*#__PURE__*/
function (_WindowMessage2) {
  _inherits(WindowFunctionReturn, _WindowMessage2);

  function WindowFunctionReturn(returnValue, uuid) {
    var _this2;

    _classCallCheck(this, WindowFunctionReturn);

    if (uuid) {
      _this2 = _possibleConstructorReturn(this, _getPrototypeOf(WindowFunctionReturn).call(this, WindowMessageType.RETURN, uuid));
    } else {
      _this2 = _possibleConstructorReturn(this, _getPrototypeOf(WindowFunctionReturn).call(this, WindowMessageType.RETURN));
    }

    _this2.returnValue = returnValue;
    return _possibleConstructorReturn(_this2);
  }

  _createClass(WindowFunctionReturn, [{
    key: "toJsonObject",
    value: function toJsonObject() {
      var s = _get(_getPrototypeOf(WindowFunctionReturn.prototype), "toJsonObject", this).call(this);

      s[WindowFunctionReturn.RETURN_VALUE_ID] = this.returnValue;
      return s;
    }
  }], [{
    key: "fromJsonObject",
    value: function fromJsonObject(jsonObject) {
      var superImpl = WindowMessage.fromJsonObject(jsonObject);
      return new WindowFunctionReturn(jsonObject[WindowFunctionReturn.RETURN_VALUE_ID], superImpl.uuid);
    }
  }]);

  return WindowFunctionReturn;
}(WindowMessage);

WindowFunctionReturn.RETURN_VALUE_ID = "returnValue";
exports.WindowFunctionReturn = WindowFunctionReturn;

/***/ }),

/***/ "../node_modules/@stefanfortuin/blackboardlib-test/common/index.js":
/*!*************************************************************************!*\
  !*** ../node_modules/@stefanfortuin/blackboardlib-test/common/index.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var BBAbstractBackend_1 = __webpack_require__(/*! ./BBAbstractBackend */ "../node_modules/@stefanfortuin/blackboardlib-test/common/BBAbstractBackend/index.js");

exports.BBAbstractBackend = BBAbstractBackend_1["default"];

var EmailRecipient_1 = __webpack_require__(/*! ./EmailRecipient */ "../node_modules/@stefanfortuin/blackboardlib-test/common/EmailRecipient.js");

exports.EmailRecipient = EmailRecipient_1["default"];

var EmailTarget_1 = __webpack_require__(/*! ./EmailTarget */ "../node_modules/@stefanfortuin/blackboardlib-test/common/EmailTarget.js");

exports.EmailTarget = EmailTarget_1.EmailTarget;

var HTTPRequest_1 = __webpack_require__(/*! ./HTTPRequest */ "../node_modules/@stefanfortuin/blackboardlib-test/common/HTTPRequest.js");

exports.HTTPRequest = HTTPRequest_1["default"];

var Utilities_1 = __webpack_require__(/*! ./Utilities */ "../node_modules/@stefanfortuin/blackboardlib-test/common/Utilities.js");

exports.Utilities = Utilities_1["default"];

var WindowConnectionManager_1 = __webpack_require__(/*! ./WindowConnectionManager */ "../node_modules/@stefanfortuin/blackboardlib-test/common/WindowConnectionManager.js");

exports.WindowConnectionManager = WindowConnectionManager_1["default"];

var WindowMessage_1 = __webpack_require__(/*! ./WindowMessage */ "../node_modules/@stefanfortuin/blackboardlib-test/common/WindowMessage.js");

exports.WindowFunctionCall = WindowMessage_1.WindowFunctionCall;
exports.WindowFunctionReturn = WindowMessage_1.WindowFunctionReturn;
exports.WindowMessage = WindowMessage_1.WindowMessage;
exports.WindowMessageFactory = WindowMessage_1.WindowMessageFactory;
exports.WindowMessageType = WindowMessage_1.WindowMessageType;

/***/ }),

/***/ "../node_modules/@stefanfortuin/blackboardlib-test/index.js":
/*!******************************************************************!*\
  !*** ../node_modules/@stefanfortuin/blackboardlib-test/index.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function __export(m) {
  for (var p in m) {
    if (!exports.hasOwnProperty(p)) exports[p] = m[p];
  }
}

Object.defineProperty(exports, "__esModule", {
  value: true
});

__export(__webpack_require__(/*! ./api */ "../node_modules/@stefanfortuin/blackboardlib-test/api/index.js"));

__export(__webpack_require__(/*! ./backend */ "../node_modules/@stefanfortuin/blackboardlib-test/backend/index.js"));

__export(__webpack_require__(/*! ./common */ "../node_modules/@stefanfortuin/blackboardlib-test/common/index.js"));

__export(__webpack_require__(/*! ./middleware */ "../node_modules/@stefanfortuin/blackboardlib-test/middleware/index.js"));

/***/ }),

/***/ "../node_modules/@stefanfortuin/blackboardlib-test/middleware/AppLoader.js":
/*!*********************************************************************************!*\
  !*** ../node_modules/@stefanfortuin/blackboardlib-test/middleware/AppLoader.js ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", {
  value: true
});

var AppLoader = function AppLoader() {
  _classCallCheck(this, AppLoader);
};

exports["default"] = AppLoader;

/***/ }),

/***/ "../node_modules/@stefanfortuin/blackboardlib-test/middleware/IframeAppLoader.js":
/*!***************************************************************************************!*\
  !*** ../node_modules/@stefanfortuin/blackboardlib-test/middleware/IframeAppLoader.js ***!
  \***************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

Object.defineProperty(exports, "__esModule", {
  value: true
});

var common_1 = __webpack_require__(/*! ../common */ "../node_modules/@stefanfortuin/blackboardlib-test/common/index.js");

var AppLoader_1 = __webpack_require__(/*! ./AppLoader */ "../node_modules/@stefanfortuin/blackboardlib-test/middleware/AppLoader.js");

var IframeAppLoader =
/*#__PURE__*/
function (_AppLoader_1$default) {
  _inherits(IframeAppLoader, _AppLoader_1$default);

  function IframeAppLoader(doc, backend) {
    var _this;

    _classCallCheck(this, IframeAppLoader);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(IframeAppLoader).call(this));
    _this.iframe = document.createElement("iframe");
    _this.iframe.style.width = "100%";
    _this.iframe.style.height = "100%";
    _this.iframe.style.border = "0px";
    _this.iframe.style.display = "none";
    var iframeContainer = doc.getElementById("iframeContainer");
    iframeContainer.appendChild(_this.iframe);
    _this.connectionManager = new common_1.WindowConnectionManager(_this.iframe.contentWindow, backend);
    return _this;
  }

  _createClass(IframeAppLoader, [{
    key: "loadApp",
    value: function loadApp(appUrl) {
      this.iframe.src = appUrl;
      this.iframe.style.display = "";
    }
  }]);

  return IframeAppLoader;
}(AppLoader_1["default"]);

exports["default"] = IframeAppLoader;

/***/ }),

/***/ "../node_modules/@stefanfortuin/blackboardlib-test/middleware/index.js":
/*!*****************************************************************************!*\
  !*** ../node_modules/@stefanfortuin/blackboardlib-test/middleware/index.js ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var AppLoader_1 = __webpack_require__(/*! ./AppLoader */ "../node_modules/@stefanfortuin/blackboardlib-test/middleware/AppLoader.js");

exports.AppLoader = AppLoader_1["default"];

var IframeAppLoader_1 = __webpack_require__(/*! ./IframeAppLoader */ "../node_modules/@stefanfortuin/blackboardlib-test/middleware/IframeAppLoader.js");

exports.IframeAppLoader = IframeAppLoader_1["default"];

/***/ }),

/***/ "./server.js":
/*!*******************!*\
  !*** ./server.js ***!
  \*******************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _stefanfortuin_blackboardlib_test__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @stefanfortuin/blackboardlib-test */ "../node_modules/@stefanfortuin/blackboardlib-test/index.js");
/* harmony import */ var _stefanfortuin_blackboardlib_test__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_stefanfortuin_blackboardlib_test__WEBPACK_IMPORTED_MODULE_0__);


window.onload = () => {
    const ifmw = new _stefanfortuin_blackboardlib_test__WEBPACK_IMPORTED_MODULE_0__["IframeAppLoader"](document, new _stefanfortuin_blackboardlib_test__WEBPACK_IMPORTED_MODULE_0__["BBNativeBackend"]());
    ifmw.loadApp("https://localhost:8080/");
};

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy9Ac3RlZmFuZm9ydHVpbi9ibGFja2JvYXJkbGliLXRlc3QvYXBpL0JCQXNzaWdubWVudEF0dGVtcHQuanMiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy9Ac3RlZmFuZm9ydHVpbi9ibGFja2JvYXJkbGliLXRlc3QvYXBpL0JCQ291cnNlLmpzIiwid2VicGFjazovLy8uLi9ub2RlX21vZHVsZXMvQHN0ZWZhbmZvcnR1aW4vYmxhY2tib2FyZGxpYi10ZXN0L2FwaS9CQkVtYWlsLmpzIiwid2VicGFjazovLy8uLi9ub2RlX21vZHVsZXMvQHN0ZWZhbmZvcnR1aW4vYmxhY2tib2FyZGxpYi10ZXN0L2FwaS9CQkZpbGUuanMiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy9Ac3RlZmFuZm9ydHVpbi9ibGFja2JvYXJkbGliLXRlc3QvYXBpL0JCR3JhZGVDb2x1bW4uanMiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy9Ac3RlZmFuZm9ydHVpbi9ibGFja2JvYXJkbGliLXRlc3QvYXBpL0JCR3JvdXAuanMiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy9Ac3RlZmFuZm9ydHVpbi9ibGFja2JvYXJkbGliLXRlc3QvYXBpL0JCVXNlci5qcyIsIndlYnBhY2s6Ly8vLi4vbm9kZV9tb2R1bGVzL0BzdGVmYW5mb3J0dWluL2JsYWNrYm9hcmRsaWItdGVzdC9hcGkvQkJVc2VySW5mby5qcyIsIndlYnBhY2s6Ly8vLi4vbm9kZV9tb2R1bGVzL0BzdGVmYW5mb3J0dWluL2JsYWNrYm9hcmRsaWItdGVzdC9hcGkvQmFja2VuZC5qcyIsIndlYnBhY2s6Ly8vLi4vbm9kZV9tb2R1bGVzL0BzdGVmYW5mb3J0dWluL2JsYWNrYm9hcmRsaWItdGVzdC9hcGkvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy9Ac3RlZmFuZm9ydHVpbi9ibGFja2JvYXJkbGliLXRlc3QvYmFja2VuZC9CQklmcmFtZUJhY2tlbmQvQkJDb3Vyc2VzLmpzIiwid2VicGFjazovLy8uLi9ub2RlX21vZHVsZXMvQHN0ZWZhbmZvcnR1aW4vYmxhY2tib2FyZGxpYi10ZXN0L2JhY2tlbmQvQkJJZnJhbWVCYWNrZW5kL0JCRW1haWxzLmpzIiwid2VicGFjazovLy8uLi9ub2RlX21vZHVsZXMvQHN0ZWZhbmZvcnR1aW4vYmxhY2tib2FyZGxpYi10ZXN0L2JhY2tlbmQvQkJJZnJhbWVCYWNrZW5kL0JCRmlsZXMuanMiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy9Ac3RlZmFuZm9ydHVpbi9ibGFja2JvYXJkbGliLXRlc3QvYmFja2VuZC9CQklmcmFtZUJhY2tlbmQvQkJHcmFkZUNvbHVtbnMuanMiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy9Ac3RlZmFuZm9ydHVpbi9ibGFja2JvYXJkbGliLXRlc3QvYmFja2VuZC9CQklmcmFtZUJhY2tlbmQvQkJHcm91cHMuanMiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy9Ac3RlZmFuZm9ydHVpbi9ibGFja2JvYXJkbGliLXRlc3QvYmFja2VuZC9CQklmcmFtZUJhY2tlbmQvQkJNaXNjLmpzIiwid2VicGFjazovLy8uLi9ub2RlX21vZHVsZXMvQHN0ZWZhbmZvcnR1aW4vYmxhY2tib2FyZGxpYi10ZXN0L2JhY2tlbmQvQkJJZnJhbWVCYWNrZW5kL0JCVXNlcnMuanMiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy9Ac3RlZmFuZm9ydHVpbi9ibGFja2JvYXJkbGliLXRlc3QvYmFja2VuZC9CQklmcmFtZUJhY2tlbmQvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy9Ac3RlZmFuZm9ydHVpbi9ibGFja2JvYXJkbGliLXRlc3QvYmFja2VuZC9CQk5hdGl2ZUJhY2tlbmQvQkJDb3Vyc2VzLmpzIiwid2VicGFjazovLy8uLi9ub2RlX21vZHVsZXMvQHN0ZWZhbmZvcnR1aW4vYmxhY2tib2FyZGxpYi10ZXN0L2JhY2tlbmQvQkJOYXRpdmVCYWNrZW5kL0JCRW1haWxzLmpzIiwid2VicGFjazovLy8uLi9ub2RlX21vZHVsZXMvQHN0ZWZhbmZvcnR1aW4vYmxhY2tib2FyZGxpYi10ZXN0L2JhY2tlbmQvQkJOYXRpdmVCYWNrZW5kL0JCRmlsZXMuanMiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy9Ac3RlZmFuZm9ydHVpbi9ibGFja2JvYXJkbGliLXRlc3QvYmFja2VuZC9CQk5hdGl2ZUJhY2tlbmQvQkJHcmFkZUNvbHVtbnMuanMiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy9Ac3RlZmFuZm9ydHVpbi9ibGFja2JvYXJkbGliLXRlc3QvYmFja2VuZC9CQk5hdGl2ZUJhY2tlbmQvQkJHcm91cHMuanMiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy9Ac3RlZmFuZm9ydHVpbi9ibGFja2JvYXJkbGliLXRlc3QvYmFja2VuZC9CQk5hdGl2ZUJhY2tlbmQvQkJNaXNjLmpzIiwid2VicGFjazovLy8uLi9ub2RlX21vZHVsZXMvQHN0ZWZhbmZvcnR1aW4vYmxhY2tib2FyZGxpYi10ZXN0L2JhY2tlbmQvQkJOYXRpdmVCYWNrZW5kL0JCVXNlcnMuanMiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy9Ac3RlZmFuZm9ydHVpbi9ibGFja2JvYXJkbGliLXRlc3QvYmFja2VuZC9CQk5hdGl2ZUJhY2tlbmQvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy9Ac3RlZmFuZm9ydHVpbi9ibGFja2JvYXJkbGliLXRlc3QvYmFja2VuZC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi4vbm9kZV9tb2R1bGVzL0BzdGVmYW5mb3J0dWluL2JsYWNrYm9hcmRsaWItdGVzdC9jb21tb24vQkJBYnN0cmFjdEJhY2tlbmQvY291cnNlcy5qcyIsIndlYnBhY2s6Ly8vLi4vbm9kZV9tb2R1bGVzL0BzdGVmYW5mb3J0dWluL2JsYWNrYm9hcmRsaWItdGVzdC9jb21tb24vQkJBYnN0cmFjdEJhY2tlbmQvZW1haWwuanMiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy9Ac3RlZmFuZm9ydHVpbi9ibGFja2JvYXJkbGliLXRlc3QvY29tbW9uL0JCQWJzdHJhY3RCYWNrZW5kL2ZpbGVzLmpzIiwid2VicGFjazovLy8uLi9ub2RlX21vZHVsZXMvQHN0ZWZhbmZvcnR1aW4vYmxhY2tib2FyZGxpYi10ZXN0L2NvbW1vbi9CQkFic3RyYWN0QmFja2VuZC9ncmFkZUNvbHVtbnMuanMiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy9Ac3RlZmFuZm9ydHVpbi9ibGFja2JvYXJkbGliLXRlc3QvY29tbW9uL0JCQWJzdHJhY3RCYWNrZW5kL2dyb3Vwcy5qcyIsIndlYnBhY2s6Ly8vLi4vbm9kZV9tb2R1bGVzL0BzdGVmYW5mb3J0dWluL2JsYWNrYm9hcmRsaWItdGVzdC9jb21tb24vQkJBYnN0cmFjdEJhY2tlbmQvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy9Ac3RlZmFuZm9ydHVpbi9ibGFja2JvYXJkbGliLXRlc3QvY29tbW9uL0JCQWJzdHJhY3RCYWNrZW5kL21pc2MuanMiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy9Ac3RlZmFuZm9ydHVpbi9ibGFja2JvYXJkbGliLXRlc3QvY29tbW9uL0JCQWJzdHJhY3RCYWNrZW5kL3VzZXJzLmpzIiwid2VicGFjazovLy8uLi9ub2RlX21vZHVsZXMvQHN0ZWZhbmZvcnR1aW4vYmxhY2tib2FyZGxpYi10ZXN0L2NvbW1vbi9FbWFpbFJlY2lwaWVudC5qcyIsIndlYnBhY2s6Ly8vLi4vbm9kZV9tb2R1bGVzL0BzdGVmYW5mb3J0dWluL2JsYWNrYm9hcmRsaWItdGVzdC9jb21tb24vRW1haWxUYXJnZXQuanMiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy9Ac3RlZmFuZm9ydHVpbi9ibGFja2JvYXJkbGliLXRlc3QvY29tbW9uL0hUVFBSZXF1ZXN0LmpzIiwid2VicGFjazovLy8uLi9ub2RlX21vZHVsZXMvQHN0ZWZhbmZvcnR1aW4vYmxhY2tib2FyZGxpYi10ZXN0L2NvbW1vbi9VdGlsaXRpZXMuanMiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy9Ac3RlZmFuZm9ydHVpbi9ibGFja2JvYXJkbGliLXRlc3QvY29tbW9uL1dpbmRvd0Nvbm5lY3Rpb25NYW5hZ2VyLmpzIiwid2VicGFjazovLy8uLi9ub2RlX21vZHVsZXMvQHN0ZWZhbmZvcnR1aW4vYmxhY2tib2FyZGxpYi10ZXN0L2NvbW1vbi9XaW5kb3dNZXNzYWdlLmpzIiwid2VicGFjazovLy8uLi9ub2RlX21vZHVsZXMvQHN0ZWZhbmZvcnR1aW4vYmxhY2tib2FyZGxpYi10ZXN0L2NvbW1vbi9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi4vbm9kZV9tb2R1bGVzL0BzdGVmYW5mb3J0dWluL2JsYWNrYm9hcmRsaWItdGVzdC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi4vbm9kZV9tb2R1bGVzL0BzdGVmYW5mb3J0dWluL2JsYWNrYm9hcmRsaWItdGVzdC9taWRkbGV3YXJlL0FwcExvYWRlci5qcyIsIndlYnBhY2s6Ly8vLi4vbm9kZV9tb2R1bGVzL0BzdGVmYW5mb3J0dWluL2JsYWNrYm9hcmRsaWItdGVzdC9taWRkbGV3YXJlL0lmcmFtZUFwcExvYWRlci5qcyIsIndlYnBhY2s6Ly8vLi4vbm9kZV9tb2R1bGVzL0BzdGVmYW5mb3J0dWluL2JsYWNrYm9hcmRsaWItdGVzdC9taWRkbGV3YXJlL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NlcnZlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrREFBMEMsZ0NBQWdDO0FBQzFFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0VBQXdELGtC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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQSxTQUFTO0FBQ1QsT0FBTztBQUNQO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxPQUFPO0FBQ1A7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULE9BQU87QUFDUDtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsT0FBTztBQUNQO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxPQUFPO0FBQ1A7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBLFNBQVM7QUFDVCxPQUFPO0FBQ1A7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULE9BQU87QUFDUDtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0EsU0FBUztBQUNULE9BQU87QUFDUDtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLG1FQUFtRSxnRUFB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QUFDQSxDQUFDLGtGQUFrRjs7QUFFbkY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQSxDQUFDOztBQUVEOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0EsR0FBRzs7QUFFSDtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBLENBQUM7O0FBRUQ7QUFDQSxvRDs7Ozs7Ozs7Ozs7O0FDek1hOztBQUViO0FBQ0E7QUFDQSxDQUFDOztBQUVELDBCQUEwQixtQkFBTyxDQUFDLGdIQUFxQjs7QUFFdkQ7O0FBRUEsdUJBQXVCLG1CQUFPLENBQUMsb0dBQWtCOztBQUVqRDs7QUFFQSxvQkFBb0IsbUJBQU8sQ0FBQyw4RkFBZTs7QUFFM0M7O0FBRUEsb0JBQW9CLG1CQUFPLENBQUMsOEZBQWU7O0FBRTNDOztBQUVBLGtCQUFrQixtQkFBTyxDQUFDLDBGQUFhOztBQUV2Qzs7QUFFQSxnQ0FBZ0MsbUJBQU8sQ0FBQyxzSEFBMkI7O0FBRW5FOztBQUVBLHNCQUFzQixtQkFBTyxDQUFDLGtHQUFpQjs7QUFFL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4RDs7Ozs7Ozs7Ozs7O0FDcENhOztBQUViO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLENBQUM7O0FBRUQsU0FBUyxtQkFBTyxDQUFDLDZFQUFPOztBQUV4QixTQUFTLG1CQUFPLENBQUMscUZBQVc7O0FBRTVCLFNBQVMsbUJBQU8sQ0FBQyxtRkFBVTs7QUFFM0IsU0FBUyxtQkFBTyxDQUFDLDJGQUFjLEc7Ozs7Ozs7Ozs7OztBQ2xCbEI7O0FBRWIsaURBQWlELDBDQUEwQywwREFBMEQsRUFBRTs7QUFFdko7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBOztBQUVBLCtCOzs7Ozs7Ozs7Ozs7QUNaYTs7QUFFYix1QkFBdUIsMkVBQTJFLGtDQUFrQyxtQkFBbUIsR0FBRyxFQUFFLE9BQU8sa0NBQWtDLDhIQUE4SCxHQUFHLEVBQUUscUJBQXFCOztBQUU3VixpREFBaUQsMENBQTBDLDBEQUEwRCxFQUFFOztBQUV2SiwyQ0FBMkMsZ0JBQWdCLGtCQUFrQixPQUFPLDJCQUEyQix3REFBd0QsZ0NBQWdDLHVEQUF1RCwyREFBMkQsRUFBRTs7QUFFM1QsNkRBQTZELHNFQUFzRSw4REFBOEQsb0JBQW9COztBQUVyTixpREFBaUQsMEVBQTBFLGFBQWEsRUFBRSxxQ0FBcUM7O0FBRS9LLHVDQUF1Qyx1QkFBdUIsdUZBQXVGLEVBQUUsYUFBYTs7QUFFcEssNkJBQTZCLGdHQUFnRyxnREFBZ0QsR0FBRywyQkFBMkI7O0FBRTNNLDBDQUEwQywrREFBK0QsMkVBQTJFLEVBQUUseUVBQXlFLGVBQWUsc0RBQXNELEVBQUUsRUFBRSx1REFBdUQ7O0FBRS9YLGdDQUFnQyw0RUFBNEUsaUJBQWlCLFVBQVUsR0FBRyw4QkFBOEI7O0FBRXhLO0FBQ0E7QUFDQSxDQUFDOztBQUVELGVBQWUsbUJBQU8sQ0FBQyxvRkFBVzs7QUFFbEMsa0JBQWtCLG1CQUFPLENBQUMsOEZBQWE7O0FBRXZDO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0EsQ0FBQzs7QUFFRCxxQzs7Ozs7Ozs7Ozs7O0FDN0RhOztBQUViO0FBQ0E7QUFDQSxDQUFDOztBQUVELGtCQUFrQixtQkFBTyxDQUFDLDhGQUFhOztBQUV2Qzs7QUFFQSx3QkFBd0IsbUJBQU8sQ0FBQywwR0FBbUI7O0FBRW5ELHVEOzs7Ozs7Ozs7Ozs7QUNaQTtBQUFBO0FBQUE7QUFBcUY7O0FBRXJGO0FBQ0EscUJBQXFCLGlGQUFlLGVBQWUsaUZBQWU7QUFDbEUsaUJBQWlCLHlCQUFhO0FBQzlCLEUiLCJmaWxlIjoic2VydmVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zZXJ2ZXIuanNcIik7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxuZnVuY3Rpb24gX2RlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7IHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07IGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTsgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlOyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7IH0gfVxuXG5mdW5jdGlvbiBfY3JlYXRlQ2xhc3MoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7IGlmIChwcm90b1Byb3BzKSBfZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpOyBpZiAoc3RhdGljUHJvcHMpIF9kZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7IHJldHVybiBDb25zdHJ1Y3RvcjsgfVxuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgQmFja2VuZF8xID0gcmVxdWlyZShcIi4vQmFja2VuZFwiKTtcblxudmFyIEJCQXNzaWdubWVudEF0dGVtcHQgPVxuLyojX19QVVJFX18qL1xuZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBCQkFzc2lnbm1lbnRBdHRlbXB0KGNvdXJzZUlkLCBjb2x1bW5JZCwgYXR0ZW1wdElkKSB7XG4gICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIEJCQXNzaWdubWVudEF0dGVtcHQpO1xuXG4gICAgdGhpcy5fY291cnNlSWQgPSBjb3Vyc2VJZDtcbiAgICB0aGlzLl9jb2x1bW5JZCA9IGNvbHVtbklkO1xuICAgIHRoaXMuX2F0dGVtcHRJZCA9IGF0dGVtcHRJZDtcbiAgICB0aGlzLmdldEF0dGVtcHRJbmZvcm1hdGlvbigpO1xuICB9XG5cbiAgX2NyZWF0ZUNsYXNzKEJCQXNzaWdubWVudEF0dGVtcHQsIFt7XG4gICAga2V5OiBcImdldEF0dGVtcHRJbmZvcm1hdGlvblwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBnZXRBdHRlbXB0SW5mb3JtYXRpb24oKSB7XG4gICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBpZiAoX3RoaXMuYXNzaWdubWVudEluZm9ybWF0aW9uKSB7XG4gICAgICAgICAgcmVzb2x2ZShfdGhpcy5hc3NpZ25tZW50SW5mb3JtYXRpb24pO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBwYXJhbWV0ZXJzID0ge1xuICAgICAgICAgIGF0dGVtcHRJZDogX3RoaXMuX2F0dGVtcHRJZCxcbiAgICAgICAgICBjb2x1bW5JZDogX3RoaXMuX2NvbHVtbklkLFxuICAgICAgICAgIGNvdXJzZUlkOiBfdGhpcy5fY291cnNlSWRcbiAgICAgICAgfTtcbiAgICAgICAgQmFja2VuZF8xW1wiZGVmYXVsdFwiXS5nZXRCYWNrZW5kKCkuZ3JhZGVDb2x1bW5zLmdldEFzc2lnbm1lbnRBdHRlbXB0KHBhcmFtZXRlcnMpLnRoZW4oZnVuY3Rpb24gKGluZm9ybWF0aW9uKSB7XG4gICAgICAgICAgX3RoaXMuYXNzaWdubWVudEluZm9ybWF0aW9uID0gaW5mb3JtYXRpb247XG4gICAgICAgICAgcmVzb2x2ZShfdGhpcy5hc3NpZ25tZW50SW5mb3JtYXRpb24pO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJnZXRBc3NvY2lhdGVkRmlsZXNcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gZ2V0QXNzb2NpYXRlZEZpbGVzKCkge1xuICAgICAgdmFyIF90aGlzMiA9IHRoaXM7XG5cbiAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGlmIChfdGhpczIuZmlsZXMpIHtcbiAgICAgICAgICByZXNvbHZlKF90aGlzMi5maWxlcyk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgX3RoaXMyLmdldEF0dGVtcHRJbmZvcm1hdGlvbigpLnRoZW4oZnVuY3Rpb24gKGF0dGVtcHRJbmZvcm1hdGlvbikge1xuICAgICAgICAgIHZhciBwYXJhbWV0ZXJzID0ge1xuICAgICAgICAgICAgYXR0ZW1wdElkOiBhdHRlbXB0SW5mb3JtYXRpb24uaWQsXG4gICAgICAgICAgICBjb3Vyc2VJZDogX3RoaXMyLl9jb3Vyc2VJZFxuICAgICAgICAgIH07XG4gICAgICAgICAgcmV0dXJuIEJhY2tlbmRfMVtcImRlZmF1bHRcIl0uZ2V0QmFja2VuZCgpLmdyYWRlQ29sdW1ucy5nZXRGaWxlc0Zyb21Bc3NpZ25tZW50QXR0ZW1wdChwYXJhbWV0ZXJzKTtcbiAgICAgICAgfSkudGhlbihmdW5jdGlvbiAoaW5mb3JtYXRpb24pIHtcbiAgICAgICAgICBfdGhpczIuZmlsZXMgPSBpbmZvcm1hdGlvbjtcbiAgICAgICAgICByZXNvbHZlKF90aGlzMi5maWxlcyk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImF0dGFjaEZpbGVcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gYXR0YWNoRmlsZShmaWxlKSB7XG4gICAgICB2YXIgX3RoaXMzID0gdGhpcztcblxuICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgdmFyIHVwbG9hZFBhcmFtZXRlcnMgPSB7XG4gICAgICAgICAgZmlsZTogZmlsZVxuICAgICAgICB9O1xuICAgICAgICBQcm9taXNlLmFsbChbX3RoaXMzLmdldEF0dGVtcHRJbmZvcm1hdGlvbigpLCBCYWNrZW5kXzFbXCJkZWZhdWx0XCJdLmdldEJhY2tlbmQoKS5maWxlcy51cGxvYWRGaWxlKHVwbG9hZFBhcmFtZXRlcnMpXSkudGhlbihmdW5jdGlvbiAocmVzcG9uc2VzKSB7XG4gICAgICAgICAgdmFyIGF0dGVtcHRJbmZvcm1hdGlvbiA9IHJlc3BvbnNlc1swXTtcbiAgICAgICAgICB2YXIgdXBsb2FkSW5mb3JtYXRpb24gPSByZXNwb25zZXNbMV07XG4gICAgICAgICAgdmFyIGF0dGFjaG1lbnRQYXJhbWV0ZXJzID0ge1xuICAgICAgICAgICAgYXR0ZW1wdElkOiBhdHRlbXB0SW5mb3JtYXRpb24uaWQsXG4gICAgICAgICAgICBjb3Vyc2VJZDogX3RoaXMzLl9jb3Vyc2VJZCxcbiAgICAgICAgICAgIGZpbGVJZDogdXBsb2FkSW5mb3JtYXRpb24uaWRcbiAgICAgICAgICB9O1xuICAgICAgICAgIHJldHVybiBCYWNrZW5kXzFbXCJkZWZhdWx0XCJdLmdldEJhY2tlbmQoKS5ncmFkZUNvbHVtbnMuYWRkRmlsZVRvQXNzaWdubWVudEF0dGVtcHQoYXR0YWNobWVudFBhcmFtZXRlcnMpO1xuICAgICAgICB9KS50aGVuKGZ1bmN0aW9uIChpbmZvcm1hdGlvbikge1xuICAgICAgICAgIHJlc29sdmUoaW5mb3JtYXRpb24pO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJyZW1vdmVGaWxlXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHJlbW92ZUZpbGUoZmlsZUlkKSB7XG4gICAgICB2YXIgX3RoaXM0ID0gdGhpcztcblxuICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgX3RoaXM0LmdldEF0dGVtcHRJbmZvcm1hdGlvbigpLnRoZW4oZnVuY3Rpb24gKGF0dGVtcHRJbmZvcm1hdGlvbikge1xuICAgICAgICAgIHZhciBwYXJhbWV0ZXJzID0ge1xuICAgICAgICAgICAgYXR0ZW1wdEZpbGVJZDogZmlsZUlkLFxuICAgICAgICAgICAgYXR0ZW1wdElkOiBhdHRlbXB0SW5mb3JtYXRpb24uaWQsXG4gICAgICAgICAgICBjb3Vyc2VJZDogX3RoaXM0Ll9jb3Vyc2VJZFxuICAgICAgICAgIH07XG4gICAgICAgICAgcmV0dXJuIEJhY2tlbmRfMVtcImRlZmF1bHRcIl0uZ2V0QmFja2VuZCgpLmdyYWRlQ29sdW1ucy5kZWxldGVGaWxlRnJvbUFzc2lnbm1lbnRBdHRlbXB0KHBhcmFtZXRlcnMpO1xuICAgICAgICB9KS50aGVuKGZ1bmN0aW9uIChpbmZvcm1hdGlvbikge1xuICAgICAgICAgIHJlc29sdmUoaW5mb3JtYXRpb24pO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJjb3Vyc2VJZFwiLFxuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgcmV0dXJuIHRoaXMuX2NvdXJzZUlkO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJjb2x1bW5JZFwiLFxuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgcmV0dXJuIHRoaXMuX2NvbHVtbklkO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJhdHRlbXB0SWRcIixcbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHJldHVybiB0aGlzLl9hdHRlbXB0SWQ7XG4gICAgfVxuICB9XSk7XG5cbiAgcmV0dXJuIEJCQXNzaWdubWVudEF0dGVtcHQ7XG59KCk7XG5cbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gQkJBc3NpZ25tZW50QXR0ZW1wdDsiLCJcInVzZSBzdHJpY3RcIjtcblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxuZnVuY3Rpb24gX2RlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7IHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07IGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTsgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlOyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7IH0gfVxuXG5mdW5jdGlvbiBfY3JlYXRlQ2xhc3MoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7IGlmIChwcm90b1Byb3BzKSBfZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpOyBpZiAoc3RhdGljUHJvcHMpIF9kZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7IHJldHVybiBDb25zdHJ1Y3RvcjsgfVxuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgQmFja2VuZF8xID0gcmVxdWlyZShcIi4vQmFja2VuZFwiKTtcblxudmFyIEJCQ291cnNlID1cbi8qI19fUFVSRV9fKi9cbmZ1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gQkJDb3Vyc2UoKSB7XG4gICAgdmFyIGNvdXJzZUlkID0gYXJndW1lbnRzLmxlbmd0aCA+IDAgJiYgYXJndW1lbnRzWzBdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMF0gOiBudWxsO1xuXG4gICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIEJCQ291cnNlKTtcblxuICAgIHRoaXMuX2NvdXJzZUlkID0ge1xuICAgICAgY291cnNlSWQ6IGNvdXJzZUlkXG4gICAgfTtcbiAgICB0aGlzLmdldENvdXJzZUluZm9ybWF0aW9uKCk7XG4gIH1cblxuICBfY3JlYXRlQ2xhc3MoQkJDb3Vyc2UsIFt7XG4gICAga2V5OiBcImdldENvdXJzZUluZm9ybWF0aW9uXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGdldENvdXJzZUluZm9ybWF0aW9uKCkge1xuICAgICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgaWYgKF90aGlzLmNvdXJzZUluZm9ybWF0aW9uKSB7XG4gICAgICAgICAgcmVzb2x2ZShfdGhpcy5jb3Vyc2VJbmZvcm1hdGlvbik7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgQmFja2VuZF8xW1wiZGVmYXVsdFwiXS5nZXRCYWNrZW5kKCkuY291cnNlcy5nZXRDb3Vyc2VJbmZvcm1hdGlvbihfdGhpcy5fY291cnNlSWQpLnRoZW4oZnVuY3Rpb24gKGluZm9ybWF0aW9uKSB7XG4gICAgICAgICAgX3RoaXMuY291cnNlSW5mb3JtYXRpb24gPSBpbmZvcm1hdGlvbjtcbiAgICAgICAgICByZXNvbHZlKF90aGlzLmNvdXJzZUluZm9ybWF0aW9uKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwicG9zdENvdXJzZVwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBwb3N0Q291cnNlKCkge1xuICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgQmFja2VuZF8xW1wiZGVmYXVsdFwiXS5nZXRCYWNrZW5kKCkuY291cnNlcy5wb3N0Q291cnNlKCkudGhlbihmdW5jdGlvbiAoY291cnNlKSB7XG4gICAgICAgICAgcmVzb2x2ZShjb3Vyc2UpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJkZWxldGVDb3Vyc2VcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gZGVsZXRlQ291cnNlKCkge1xuICAgICAgdmFyIF90aGlzMiA9IHRoaXM7XG5cbiAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIEJhY2tlbmRfMVtcImRlZmF1bHRcIl0uZ2V0QmFja2VuZCgpLmNvdXJzZXMuZGVsZXRlQ291cnNlKF90aGlzMi5fY291cnNlSWQpLnRoZW4oZnVuY3Rpb24gKGluZm9ybWF0aW9uKSB7XG4gICAgICAgICAgcmVzb2x2ZShpbmZvcm1hdGlvbik7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcInBhdGNoQ291cnNlXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHBhdGNoQ291cnNlKCkge1xuICAgICAgdmFyIF90aGlzMyA9IHRoaXM7XG5cbiAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIEJhY2tlbmRfMVtcImRlZmF1bHRcIl0uZ2V0QmFja2VuZCgpLmNvdXJzZXMucGF0Y2hDb3Vyc2UoX3RoaXMzLl9jb3Vyc2VJZCkudGhlbihmdW5jdGlvbiAoaW5mb3JtYXRpb24pIHtcbiAgICAgICAgICByZXNvbHZlKGluZm9ybWF0aW9uKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiZ2V0Q291cnNlQ29udGVudHNcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gZ2V0Q291cnNlQ29udGVudHMoKSB7XG4gICAgICB2YXIgX3RoaXM0ID0gdGhpcztcblxuICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgaWYgKF90aGlzNC5jb3Vyc2VDb250ZW50cykge1xuICAgICAgICAgIHJlc29sdmUoX3RoaXM0LmNvdXJzZUNvbnRlbnRzKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBCYWNrZW5kXzFbXCJkZWZhdWx0XCJdLmdldEJhY2tlbmQoKS5jb3Vyc2VzLmdldENvdXJzZUNvbnRlbnRzKF90aGlzNC5fY291cnNlSWQpLnRoZW4oZnVuY3Rpb24gKGNvbnRlbnRzKSB7XG4gICAgICAgICAgX3RoaXM0LmNvdXJzZUNvbnRlbnRzID0gY29udGVudHM7XG4gICAgICAgICAgcmVzb2x2ZShfdGhpczQuY291cnNlQ29udGVudHMpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJnZXRDb3Vyc2VDaGlsZHJlblwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBnZXRDb3Vyc2VDaGlsZHJlbigpIHtcbiAgICAgIHZhciBfdGhpczUgPSB0aGlzO1xuXG4gICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBpZiAoX3RoaXM1LmNvdXJzZUNoaWxkcmVuKSB7XG4gICAgICAgICAgcmVzb2x2ZShfdGhpczUuY291cnNlQ2hpbGRyZW4pO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIEJhY2tlbmRfMVtcImRlZmF1bHRcIl0uZ2V0QmFja2VuZCgpLmNvdXJzZXMuZ2V0Q291cnNlQ2hpbGRyZW4oX3RoaXM1Ll9jb3Vyc2VJZCkudGhlbihmdW5jdGlvbiAoY2hpbGRyZW4pIHtcbiAgICAgICAgICBfdGhpczUuY291cnNlQ2hpbGRyZW4gPSBjaGlsZHJlbjtcbiAgICAgICAgICByZXNvbHZlKF90aGlzNS5jb3Vyc2VDaGlsZHJlbik7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImdldENvdXJzZUNvbnRlbnRcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gZ2V0Q291cnNlQ29udGVudChjb250ZW50SWQpIHtcbiAgICAgIHZhciBfdGhpczYgPSB0aGlzO1xuXG4gICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBpZiAoX3RoaXM2LmNvdXJzZUNvbnRlbnRzKSB7XG4gICAgICAgICAgX3RoaXM2LmNvdXJzZUNvbnRlbnRzLmZvckVhY2goZnVuY3Rpb24gKGVsZW1lbnQpIHtcbiAgICAgICAgICAgIGlmIChlbGVtZW50LmlkID09IGNvbnRlbnRJZCkge1xuICAgICAgICAgICAgICByZXNvbHZlKGVsZW1lbnQpO1xuICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgcGFyYW1ldGVycyA9IHtcbiAgICAgICAgICBjb3Vyc2VJZDogX3RoaXM2Ll9jb3Vyc2VJZC5jb3Vyc2VJZCxcbiAgICAgICAgICBjb250ZW50SWQ6IGNvbnRlbnRJZFxuICAgICAgICB9O1xuICAgICAgICBCYWNrZW5kXzFbXCJkZWZhdWx0XCJdLmdldEJhY2tlbmQoKS5jb3Vyc2VzLmdldENvdXJzZUNvbnRlbnQocGFyYW1ldGVycykudGhlbihmdW5jdGlvbiAoY2hpbGQpIHtcbiAgICAgICAgICByZXNvbHZlKGNoaWxkKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwicG9zdENvdXJzZUNvbnRlbnRcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gcG9zdENvdXJzZUNvbnRlbnQoKSB7XG4gICAgICB2YXIgX3RoaXM3ID0gdGhpcztcblxuICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgQmFja2VuZF8xW1wiZGVmYXVsdFwiXS5nZXRCYWNrZW5kKCkuY291cnNlcy5wb3N0Q291cnNlQ29udGVudChfdGhpczcuX2NvdXJzZUlkKS50aGVuKGZ1bmN0aW9uIChjb3Vyc2UpIHtcbiAgICAgICAgICByZXNvbHZlKGNvdXJzZSk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImRlbGV0ZUNvdXJzZUNvbnRlbnRcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gZGVsZXRlQ291cnNlQ29udGVudChjb250ZW50SWQpIHtcbiAgICAgIHZhciBfdGhpczggPSB0aGlzO1xuXG4gICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICB2YXIgcGFyYW1ldGVycyA9IHtcbiAgICAgICAgICBjb3Vyc2VJZDogX3RoaXM4Ll9jb3Vyc2VJZC5jb3Vyc2VJZCxcbiAgICAgICAgICBjb250ZW50SWQ6IGNvbnRlbnRJZFxuICAgICAgICB9O1xuICAgICAgICBCYWNrZW5kXzFbXCJkZWZhdWx0XCJdLmdldEJhY2tlbmQoKS5jb3Vyc2VzLmRlbGV0ZUNvdXJzZUNvbnRlbnQocGFyYW1ldGVycykudGhlbihmdW5jdGlvbiAoY291cnNlKSB7XG4gICAgICAgICAgcmVzb2x2ZShjb3Vyc2UpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJwYXRjaENvdXJzZUNvbnRlbnRcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gcGF0Y2hDb3Vyc2VDb250ZW50KGNvbnRlbnRJZCkge1xuICAgICAgdmFyIF90aGlzOSA9IHRoaXM7XG5cbiAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIHZhciBwYXJhbWV0ZXJzID0ge1xuICAgICAgICAgIGNvdXJzZUlkOiBfdGhpczkuX2NvdXJzZUlkLmNvdXJzZUlkLFxuICAgICAgICAgIGNvbnRlbnRJZDogY29udGVudElkXG4gICAgICAgIH07XG4gICAgICAgIEJhY2tlbmRfMVtcImRlZmF1bHRcIl0uZ2V0QmFja2VuZCgpLmNvdXJzZXMucGF0Y2hDb3Vyc2VDb250ZW50KHBhcmFtZXRlcnMpLnRoZW4oZnVuY3Rpb24gKGNvdXJzZSkge1xuICAgICAgICAgIHJlc29sdmUoY291cnNlKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiZ2V0Q291cnNlQ29udGVudENoaWxkcmVuXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGdldENvdXJzZUNvbnRlbnRDaGlsZHJlbihjb250ZW50SWQpIHtcbiAgICAgIHZhciBfdGhpczEwID0gdGhpcztcblxuICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgdmFyIHBhcmFtZXRlcnMgPSB7XG4gICAgICAgICAgY291cnNlSWQ6IF90aGlzMTAuX2NvdXJzZUlkLmNvdXJzZUlkLFxuICAgICAgICAgIGNvbnRlbnRJZDogY29udGVudElkXG4gICAgICAgIH07XG4gICAgICAgIEJhY2tlbmRfMVtcImRlZmF1bHRcIl0uZ2V0QmFja2VuZCgpLmNvdXJzZXMuZ2V0Q291cnNlQ29udGVudENoaWxkcmVuKHBhcmFtZXRlcnMpLnRoZW4oZnVuY3Rpb24gKGNvdXJzZSkge1xuICAgICAgICAgIHJlc29sdmUoY291cnNlKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwicG9zdENvdXJzZUNvbnRlbnRDaGlsZHJlblwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBwb3N0Q291cnNlQ29udGVudENoaWxkcmVuKGNvbnRlbnRJZCkge1xuICAgICAgdmFyIF90aGlzMTEgPSB0aGlzO1xuXG4gICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICB2YXIgcGFyYW1ldGVycyA9IHtcbiAgICAgICAgICBjb3Vyc2VJZDogX3RoaXMxMS5fY291cnNlSWQuY291cnNlSWQsXG4gICAgICAgICAgY29udGVudElkOiBjb250ZW50SWRcbiAgICAgICAgfTtcbiAgICAgICAgQmFja2VuZF8xW1wiZGVmYXVsdFwiXS5nZXRCYWNrZW5kKCkuY291cnNlcy5wb3N0Q291cnNlQ29udGVudENoaWxkcmVuKHBhcmFtZXRlcnMpLnRoZW4oZnVuY3Rpb24gKGNvdXJzZSkge1xuICAgICAgICAgIHJlc29sdmUoY291cnNlKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiZ2V0QXNzaWdubWVudENvbHNcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gZ2V0QXNzaWdubWVudENvbHMoKSB7XG4gICAgICB2YXIgX3RoaXMxMiA9IHRoaXM7XG5cbiAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGlmIChfdGhpczEyLmFzc2lnbm1lbnRzKSB7XG4gICAgICAgICAgcmVzb2x2ZShfdGhpczEyLmFzc2lnbm1lbnRzKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBCYWNrZW5kXzFbXCJkZWZhdWx0XCJdLmdldEJhY2tlbmQoKS5jb3Vyc2VzLmdldEFzc2lnbm1lbnRDb2xzKF90aGlzMTIuX2NvdXJzZUlkKS50aGVuKGZ1bmN0aW9uIChhc3NpZ25tZW50cykge1xuICAgICAgICAgIHJlc29sdmUoYXNzaWdubWVudHMpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJnZXRBbm5vdW5jZW1lbnRzXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGdldEFubm91bmNlbWVudHMoKSB7XG4gICAgICB2YXIgX3RoaXMxMyA9IHRoaXM7XG5cbiAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIEJhY2tlbmRfMVtcImRlZmF1bHRcIl0uZ2V0QmFja2VuZCgpLmNvdXJzZXMuZ2V0QW5ub3VuY2VtZW50cyhfdGhpczEzLl9jb3Vyc2VJZCkudGhlbihmdW5jdGlvbiAoYW5ub3VuY2VtZW50cykge1xuICAgICAgICAgIHJlc29sdmUoYW5ub3VuY2VtZW50cyk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfVxuICB9XSk7XG5cbiAgcmV0dXJuIEJCQ291cnNlO1xufSgpO1xuXG5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IEJCQ291cnNlOyIsIlwidXNlIHN0cmljdFwiO1xuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG5mdW5jdGlvbiBfZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7IGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHsgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTsgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlOyBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7IGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTsgfSB9XG5cbmZ1bmN0aW9uIF9jcmVhdGVDbGFzcyhDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHsgaWYgKHByb3RvUHJvcHMpIF9kZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7IGlmIChzdGF0aWNQcm9wcykgX2RlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTsgcmV0dXJuIENvbnN0cnVjdG9yOyB9XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBCYWNrZW5kXzEgPSByZXF1aXJlKFwiLi9CYWNrZW5kXCIpO1xuXG52YXIgQkJFbWFpbCA9XG4vKiNfX1BVUkVfXyovXG5mdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIEJCRW1haWwoY291cnNlSWQsIHJlY2lwaWVudHMpIHtcbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgQkJFbWFpbCk7XG5cbiAgICB0aGlzLl9jb3Vyc2VJZCA9IGNvdXJzZUlkO1xuICAgIHRoaXMuX3JlY2lwaWVudHMgPSByZWNpcGllbnRzO1xuICAgIHRoaXMuX3N1YmplY3QgPSAnJztcbiAgICB0aGlzLl9tZXNzYWdlID0gJyc7XG4gICAgdGhpcy5fcmV0dXJuUmVjaXBpZW50ID0gZmFsc2U7XG4gICAgdGhpcy5fYXR0YWNobWVudHMgPSBbXTtcbiAgfVxuXG4gIF9jcmVhdGVDbGFzcyhCQkVtYWlsLCBbe1xuICAgIGtleTogXCJhZGRBdHRhY2htZW50XCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGFkZEF0dGFjaG1lbnQoYXR0YWNobWVudCkge1xuICAgICAgdGhpcy5fYXR0YWNobWVudHMucHVzaChhdHRhY2htZW50KTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwic2VuZFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBzZW5kKCkge1xuICAgICAgdmFyIHBhcmFtZXRlcnMgPSB7XG4gICAgICAgIGF0dGFjaG1lbnRzOiB0aGlzLmF0dGFjaG1lbnRzLFxuICAgICAgICBib2R5OiB0aGlzLm1lc3NhZ2UsXG4gICAgICAgIGNvdXJzZUlkOiB0aGlzLmNvdXJzZUlkLFxuICAgICAgICByZWNpcGllbnRzOiB0aGlzLnJlY2lwaWVudHMuYXNQbGFpbk9iamVjdCgpLFxuICAgICAgICByZXR1cm5SZWNpcGllbnQ6IHRoaXMucmV0dXJuUmVjaXBpZW50LFxuICAgICAgICBzdWJqZWN0OiB0aGlzLnN1YmplY3RcbiAgICAgIH07XG4gICAgICByZXR1cm4gQmFja2VuZF8xW1wiZGVmYXVsdFwiXS5nZXRCYWNrZW5kKCkuZW1haWwuc2VuZE1haWwocGFyYW1ldGVycyk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImNvdXJzZUlkXCIsXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICByZXR1cm4gdGhpcy5fY291cnNlSWQ7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcInN1YmplY3RcIixcbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHJldHVybiB0aGlzLl9zdWJqZWN0O1xuICAgIH0sXG4gICAgc2V0OiBmdW5jdGlvbiBzZXQoc3ViamVjdCkge1xuICAgICAgdGhpcy5fc3ViamVjdCA9IHN1YmplY3Q7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcIm1lc3NhZ2VcIixcbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHJldHVybiB0aGlzLl9tZXNzYWdlO1xuICAgIH0sXG4gICAgc2V0OiBmdW5jdGlvbiBzZXQobWVzc2FnZSkge1xuICAgICAgdGhpcy5fbWVzc2FnZSA9IG1lc3NhZ2U7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcInJlY2lwaWVudHNcIixcbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHJldHVybiB0aGlzLl9yZWNpcGllbnRzO1xuICAgIH0sXG4gICAgc2V0OiBmdW5jdGlvbiBzZXQocmVjaXBpZW50cykge1xuICAgICAgdGhpcy5fcmVjaXBpZW50cyA9IHJlY2lwaWVudHM7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcInJldHVyblJlY2lwaWVudFwiLFxuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgcmV0dXJuIHRoaXMuX3JldHVyblJlY2lwaWVudDtcbiAgICB9LFxuICAgIHNldDogZnVuY3Rpb24gc2V0KHJldHVyblJlY2lwaWVudCkge1xuICAgICAgdGhpcy5fcmV0dXJuUmVjaXBpZW50ID0gcmV0dXJuUmVjaXBpZW50O1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJhdHRhY2htZW50c1wiLFxuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgcmV0dXJuIHRoaXMuX2F0dGFjaG1lbnRzO1xuICAgIH0sXG4gICAgc2V0OiBmdW5jdGlvbiBzZXQoYXR0YWNobWVudHMpIHtcbiAgICAgIHRoaXMuX2F0dGFjaG1lbnRzID0gYXR0YWNobWVudHM7XG4gICAgfVxuICB9XSk7XG5cbiAgcmV0dXJuIEJCRW1haWw7XG59KCk7XG5cbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gQkJFbWFpbDsiLCJcInVzZSBzdHJpY3RcIjtcblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxuZnVuY3Rpb24gX2RlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7IHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07IGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTsgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlOyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7IH0gfVxuXG5mdW5jdGlvbiBfY3JlYXRlQ2xhc3MoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7IGlmIChwcm90b1Byb3BzKSBfZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpOyBpZiAoc3RhdGljUHJvcHMpIF9kZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7IHJldHVybiBDb25zdHJ1Y3RvcjsgfVxuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgQmFja2VuZF8xID0gcmVxdWlyZShcIi4vQmFja2VuZFwiKTtcblxudmFyIEJCRmlsZSA9XG4vKiNfX1BVUkVfXyovXG5mdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIEJCRmlsZShjb3Vyc2UsIG5hbWUpIHtcbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgQkJGaWxlKTtcblxuICAgIHRoaXMuX2NvdXJzZSA9IGNvdXJzZTtcbiAgICB0aGlzLl9uYW1lID0gbmFtZTtcbiAgfVxuXG4gIF9jcmVhdGVDbGFzcyhCQkZpbGUsIFt7XG4gICAga2V5OiBcInNldEJvZHlcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gc2V0Qm9keShib2R5KSB7XG4gICAgICB0aGlzLl9ib2R5ID0gYm9keTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiY3JlYXRlRm9sZGVyXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGNyZWF0ZUZvbGRlcigpIHtcbiAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIF90aGlzLl9jb3Vyc2UuZ2V0Q291cnNlSW5mb3JtYXRpb24oKS50aGVuKGZ1bmN0aW9uIChpbmZvcm1hdGlvbikge1xuICAgICAgICAgIHZhciBwYXJhbWV0ZXJzID0ge1xuICAgICAgICAgICAgaWQ6IGluZm9ybWF0aW9uLmlkLFxuICAgICAgICAgICAgY291cnNlSWQ6IGluZm9ybWF0aW9uLmNvdXJzZUlkLFxuICAgICAgICAgICAgbmFtZTogX3RoaXMuX25hbWVcbiAgICAgICAgICB9O1xuICAgICAgICAgIHJlc29sdmUoQmFja2VuZF8xW1wiZGVmYXVsdFwiXS5nZXRCYWNrZW5kKCkuZmlsZXMuY3JlYXRlRm9sZGVyKHBhcmFtZXRlcnMpKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiZGVsZXRlRmlsZVwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBkZWxldGVGaWxlKCkge1xuICAgICAgdmFyIF90aGlzMiA9IHRoaXM7XG5cbiAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIF90aGlzMi5fY291cnNlLmdldENvdXJzZUluZm9ybWF0aW9uKCkudGhlbihmdW5jdGlvbiAoaW5mb3JtYXRpb24pIHtcbiAgICAgICAgICB2YXIgcGFyYW1ldGVycyA9IHtcbiAgICAgICAgICAgIGlkOiBpbmZvcm1hdGlvbi5pZCxcbiAgICAgICAgICAgIGNvdXJzZUlkOiBpbmZvcm1hdGlvbi5jb3Vyc2VJZCxcbiAgICAgICAgICAgIG5hbWU6IF90aGlzMi5fbmFtZVxuICAgICAgICAgIH07XG4gICAgICAgICAgcmVzb2x2ZShCYWNrZW5kXzFbXCJkZWZhdWx0XCJdLmdldEJhY2tlbmQoKS5maWxlcy5kZWxldGVGaWxlKHBhcmFtZXRlcnMpKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiZG93bmxvYWRGaWxlXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGRvd25sb2FkRmlsZSgpIHtcbiAgICAgIHZhciBfdGhpczMgPSB0aGlzO1xuXG4gICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBfdGhpczMuX2NvdXJzZS5nZXRDb3Vyc2VJbmZvcm1hdGlvbigpLnRoZW4oZnVuY3Rpb24gKGluZm9ybWF0aW9uKSB7XG4gICAgICAgICAgdmFyIHBhcmFtZXRlcnMgPSB7XG4gICAgICAgICAgICBpZDogaW5mb3JtYXRpb24uaWQsXG4gICAgICAgICAgICBjb3Vyc2VJZDogaW5mb3JtYXRpb24uY291cnNlSWQsXG4gICAgICAgICAgICBuYW1lOiBfdGhpczMuX25hbWVcbiAgICAgICAgICB9O1xuICAgICAgICAgIHJlc29sdmUoQmFja2VuZF8xW1wiZGVmYXVsdFwiXS5nZXRCYWNrZW5kKCkuZmlsZXMuZG93bmxvYWRGaWxlKHBhcmFtZXRlcnMpKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwicHVibGlzaEZpbGVcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gcHVibGlzaEZpbGUoKSB7XG4gICAgICB2YXIgX3RoaXM0ID0gdGhpcztcblxuICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgX3RoaXM0Ll9jb3Vyc2UuZ2V0Q291cnNlSW5mb3JtYXRpb24oKS50aGVuKGZ1bmN0aW9uIChpbmZvcm1hdGlvbikge1xuICAgICAgICAgIHZhciBwYXJhbWV0ZXJzID0ge1xuICAgICAgICAgICAgY291cnNlSWQ6IGluZm9ybWF0aW9uLmNvdXJzZUlkLFxuICAgICAgICAgICAgaWQ6IGluZm9ybWF0aW9uLmlkLFxuICAgICAgICAgICAgbmFtZTogX3RoaXM0Ll9uYW1lLFxuICAgICAgICAgICAgYm9keTogX3RoaXM0Ll9ib2R5XG4gICAgICAgICAgfTtcbiAgICAgICAgICByZXNvbHZlKEJhY2tlbmRfMVtcImRlZmF1bHRcIl0uZ2V0QmFja2VuZCgpLmZpbGVzLnB1Ymxpc2hGaWxlKHBhcmFtZXRlcnMpKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwic2V0UGVybWlzc2lvbnNcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gc2V0UGVybWlzc2lvbnMoKSB7XG4gICAgICB2YXIgX3RoaXM1ID0gdGhpcztcblxuICAgICAgdmFyIHBlcm1pc3Npb25zID0gYXJndW1lbnRzLmxlbmd0aCA+IDAgJiYgYXJndW1lbnRzWzBdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMF0gOiBudWxsO1xuICAgICAgaWYgKHBlcm1pc3Npb25zICE9PSBudWxsKSB0aGlzLl9wZXJtaXNzaW9ucyA9IHBlcm1pc3Npb25zO1xuICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgX3RoaXM1Ll9jb3Vyc2UuZ2V0Q291cnNlSW5mb3JtYXRpb24oKS50aGVuKGZ1bmN0aW9uIChpbmZvcm1hdGlvbikge1xuICAgICAgICAgIHZhciBwYXJhbWV0ZXJzID0ge1xuICAgICAgICAgICAgY291cnNlSWQ6IGluZm9ybWF0aW9uLmNvdXJzZUlkLFxuICAgICAgICAgICAgaWQ6IGluZm9ybWF0aW9uLmlkLFxuICAgICAgICAgICAgbmFtZTogX3RoaXM1Ll9uYW1lLFxuICAgICAgICAgICAgYkFsbG93RXZlcnlvbmU6IF90aGlzNS5fcGVybWlzc2lvbnMuYkFsbG93RXZlcnlvbmUsXG4gICAgICAgICAgICBCOiBfdGhpczUuX3Blcm1pc3Npb25zLkIsXG4gICAgICAgICAgICBHOiBfdGhpczUuX3Blcm1pc3Npb25zLkcsXG4gICAgICAgICAgICBQOiBfdGhpczUuX3Blcm1pc3Npb25zLlAsXG4gICAgICAgICAgICBTOiBfdGhpczUuX3Blcm1pc3Npb25zLlMsXG4gICAgICAgICAgICBUOiBfdGhpczUuX3Blcm1pc3Npb25zLlQsXG4gICAgICAgICAgICBVOiBfdGhpczUuX3Blcm1pc3Npb25zLlUsXG4gICAgICAgICAgICBiQWxsb3dSZWFkOiBfdGhpczUuX3Blcm1pc3Npb25zLmJBbGxvd1JlYWQsXG4gICAgICAgICAgICBiQWxsb3dXcml0ZTogX3RoaXM1Ll9wZXJtaXNzaW9ucy5iQWxsb3dXcml0ZSxcbiAgICAgICAgICAgIGJBbGxvd0RlbGV0ZTogX3RoaXM1Ll9wZXJtaXNzaW9ucy5iQWxsb3dEZWxldGUsXG4gICAgICAgICAgICBiQWxsb3dNYW5hZ2U6IF90aGlzNS5fcGVybWlzc2lvbnMuYkFsbG93TWFuYWdlXG4gICAgICAgICAgfTtcbiAgICAgICAgICByZXNvbHZlKEJhY2tlbmRfMVtcImRlZmF1bHRcIl0uZ2V0QmFja2VuZCgpLmZpbGVzLnNldFBlcm1pc3Npb25zKHBhcmFtZXRlcnMpKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1dKTtcblxuICByZXR1cm4gQkJGaWxlO1xufSgpO1xuXG5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IEJCRmlsZTsiLCJcInVzZSBzdHJpY3RcIjtcblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxuZnVuY3Rpb24gX2RlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7IHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07IGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTsgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlOyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7IH0gfVxuXG5mdW5jdGlvbiBfY3JlYXRlQ2xhc3MoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7IGlmIChwcm90b1Byb3BzKSBfZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpOyBpZiAoc3RhdGljUHJvcHMpIF9kZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7IHJldHVybiBDb25zdHJ1Y3RvcjsgfVxuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgQmFja2VuZF8xID0gcmVxdWlyZShcIi4vQmFja2VuZFwiKTtcblxudmFyIEJCR3JhZGVDb2x1bW4gPVxuLyojX19QVVJFX18qL1xuZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBCQkdyYWRlQ29sdW1uKGNvdXJzZUlkLCBjb2x1bW5JZCkge1xuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBCQkdyYWRlQ29sdW1uKTtcblxuICAgIHRoaXMuX2NvbHVtbklkID0ge1xuICAgICAgY291cnNlSWQ6IGNvdXJzZUlkLFxuICAgICAgY29sdW1uSWQ6IGNvbHVtbklkXG4gICAgfTtcbiAgfVxuXG4gIF9jcmVhdGVDbGFzcyhCQkdyYWRlQ29sdW1uLCBbe1xuICAgIGtleTogXCJnZXRBc3NpZ25tZW50Q29sXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGdldEFzc2lnbm1lbnRDb2woKSB7XG4gICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUpIHtcbiAgICAgICAgaWYgKF90aGlzLl9jb2x1bW4pIHtcbiAgICAgICAgICByZXNvbHZlKF90aGlzLl9jb2x1bW4pO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIEJhY2tlbmRfMVtcImRlZmF1bHRcIl0uZ2V0QmFja2VuZCgpLmdyYWRlQ29sdW1ucy5nZXRBc3NpZ25tZW50Q29sKF90aGlzLl9jb2x1bW5JZCkudGhlbihmdW5jdGlvbiAoaW5mb3JtYXRpb24pIHtcbiAgICAgICAgICBfdGhpcy5fY29sdW1uID0gaW5mb3JtYXRpb247XG4gICAgICAgICAgcmVzb2x2ZShpbmZvcm1hdGlvbik7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImRlbGV0ZUFzc2lnbm1lbnRDb2xcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gZGVsZXRlQXNzaWdubWVudENvbCgpIHtcbiAgICAgIHZhciBfdGhpczIgPSB0aGlzO1xuXG4gICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUpIHtcbiAgICAgICAgQmFja2VuZF8xW1wiZGVmYXVsdFwiXS5nZXRCYWNrZW5kKCkuZ3JhZGVDb2x1bW5zLmRlbGV0ZUFzc2lnbm1lbnRDb2woX3RoaXMyLl9jb2x1bW5JZCkudGhlbihmdW5jdGlvbiAoaW5mb3JtYXRpb24pIHtcbiAgICAgICAgICB2YXIgcmVzcG9uc2UgPSB7XG4gICAgICAgICAgICBzdWNjZXNzOiB0cnVlXG4gICAgICAgICAgfTtcbiAgICAgICAgICByZXNvbHZlKHJlc3BvbnNlKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiZ2V0QXNzaWdubWVudEF0dGVtcHRzXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGdldEFzc2lnbm1lbnRBdHRlbXB0cygpIHtcbiAgICAgIHZhciBfdGhpczMgPSB0aGlzO1xuXG4gICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUpIHtcbiAgICAgICAgQmFja2VuZF8xW1wiZGVmYXVsdFwiXS5nZXRCYWNrZW5kKCkuZ3JhZGVDb2x1bW5zLmdldEFzc2lnbm1lbnRBdHRlbXB0cyhfdGhpczMuX2NvbHVtbklkKS50aGVuKGZ1bmN0aW9uIChpbmZvcm1hdGlvbikge1xuICAgICAgICAgIHJlc29sdmUoaW5mb3JtYXRpb24pO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJnZXRBc3NpZ25tZW50QXR0ZW1wdFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBnZXRBc3NpZ25tZW50QXR0ZW1wdChhc3NpZ25tZW50SWQpIHtcbiAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSkge1xuICAgICAgICBCYWNrZW5kXzFbXCJkZWZhdWx0XCJdLmdldEJhY2tlbmQoKS5ncmFkZUNvbHVtbnMuZ2V0QXNzaWdubWVudEF0dGVtcHQoYXNzaWdubWVudElkKS50aGVuKGZ1bmN0aW9uIChpbmZvcm1hdGlvbikge1xuICAgICAgICAgIHJlc29sdmUoaW5mb3JtYXRpb24pO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJjb2x1bW5JZFwiLFxuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgcmV0dXJuIHRoaXMuX2NvbHVtbklkLmNvbHVtbklkO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJjb3Vyc2VJZFwiLFxuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgcmV0dXJuIHRoaXMuX2NvbHVtbklkLmNvdXJzZUlkO1xuICAgIH1cbiAgfV0pO1xuXG4gIHJldHVybiBCQkdyYWRlQ29sdW1uO1xufSgpO1xuXG5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IEJCR3JhZGVDb2x1bW47IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5cbmZ1bmN0aW9uIF9kZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHsgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykgeyB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldOyBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7IGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTsgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpOyB9IH1cblxuZnVuY3Rpb24gX2NyZWF0ZUNsYXNzKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykgeyBpZiAocHJvdG9Qcm9wcykgX2RlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTsgaWYgKHN0YXRpY1Byb3BzKSBfZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpOyByZXR1cm4gQ29uc3RydWN0b3I7IH1cblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIEJhY2tlbmRfMSA9IHJlcXVpcmUoXCIuL0JhY2tlbmRcIik7XG5cbnZhciBCQkdyb3VwID1cbi8qI19fUFVSRV9fKi9cbmZ1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gQkJHcm91cChjb3Vyc2VJZCkge1xuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBCQkdyb3VwKTtcblxuICAgIHRoaXMuX2NvdXJzZUlkID0gY291cnNlSWQ7XG4gIH1cblxuICBfY3JlYXRlQ2xhc3MoQkJHcm91cCwgW3tcbiAgICBrZXk6IFwiZ2V0R3JvdXBzXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGdldEdyb3VwcygpIHtcbiAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGlmIChfdGhpcy5ncm91cHMpIHtcbiAgICAgICAgICByZXNvbHZlKF90aGlzLmdyb3Vwcyk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHBhcmFtZXRlcnMgPSB7XG4gICAgICAgICAgY291cnNlSWQ6IF90aGlzLmNvdXJzZUlkXG4gICAgICAgIH07XG4gICAgICAgIEJhY2tlbmRfMVtcImRlZmF1bHRcIl0uZ2V0QmFja2VuZCgpLmdyb3Vwcy5nZXRHcm91cHMocGFyYW1ldGVycykudGhlbihmdW5jdGlvbiAoaW5mb3JtYXRpb24pIHtcbiAgICAgICAgICBfdGhpcy5ncm91cHMgPSBpbmZvcm1hdGlvbjtcbiAgICAgICAgICByZXNvbHZlKF90aGlzLmdyb3Vwcyk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImNvdXJzZUlkXCIsXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICByZXR1cm4gdGhpcy5fY291cnNlSWQ7XG4gICAgfVxuICB9XSk7XG5cbiAgcmV0dXJuIEJCR3JvdXA7XG59KCk7XG5cbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gQkJHcm91cDsiLCJcInVzZSBzdHJpY3RcIjtcblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxuZnVuY3Rpb24gX2RlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7IHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07IGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTsgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlOyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7IH0gfVxuXG5mdW5jdGlvbiBfY3JlYXRlQ2xhc3MoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7IGlmIChwcm90b1Byb3BzKSBfZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpOyBpZiAoc3RhdGljUHJvcHMpIF9kZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7IHJldHVybiBDb25zdHJ1Y3RvcjsgfVxuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgQmFja2VuZF8xID0gcmVxdWlyZShcIi4vQmFja2VuZFwiKTtcblxudmFyIEJCVXNlciA9XG4vKiNfX1BVUkVfXyovXG5mdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIEJCVXNlcih1c2VySWQpIHtcbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgQkJVc2VyKTtcblxuICAgIHRoaXMuX3VzZXJJZCA9IHVzZXJJZDtcbiAgfVxuXG4gIF9jcmVhdGVDbGFzcyhCQlVzZXIsIFt7XG4gICAga2V5OiBcImdldEVucm9sbGVkQ291cnNlc1wiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBnZXRFbnJvbGxlZENvdXJzZXMoKSB7XG4gICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBpZiAoX3RoaXMuZW5yb2xsZWRDb3Vyc2VzKSB7XG4gICAgICAgICAgcmVzb2x2ZShfdGhpcy5lbnJvbGxlZENvdXJzZXMpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBwYXJhbWV0ZXJzID0ge1xuICAgICAgICAgIG9mZnNldDogMCxcbiAgICAgICAgICB1c2VySWQ6IF90aGlzLnVzZXJJZFxuICAgICAgICB9O1xuICAgICAgICBCYWNrZW5kXzFbXCJkZWZhdWx0XCJdLmdldEJhY2tlbmQoKS5jb3Vyc2VzLmdldEVucm9sbGVkQ291cnNlcyhwYXJhbWV0ZXJzKS50aGVuKGZ1bmN0aW9uIChpbmZvcm1hdGlvbikge1xuICAgICAgICAgIF90aGlzLmVucm9sbGVkQ291cnNlcyA9IGluZm9ybWF0aW9uO1xuICAgICAgICAgIHJlc29sdmUoX3RoaXMuZW5yb2xsZWRDb3Vyc2VzKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiZ2V0R3JhZGVzXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGdldEdyYWRlcyhjb3Vyc2UpIHtcbiAgICAgIHZhciBfdGhpczIgPSB0aGlzO1xuXG4gICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBpZiAoX3RoaXMyLmdyYWRlcykge1xuICAgICAgICAgIHJlc29sdmUoX3RoaXMyLmdyYWRlcyk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHBhcmFtZXRlcnMgPSB7XG4gICAgICAgICAgY291cnNlSWQ6IGNvdXJzZS5jb3Vyc2VJZCxcbiAgICAgICAgICB1c2VySWQ6IF90aGlzMi51c2VySWRcbiAgICAgICAgfTtcbiAgICAgICAgQmFja2VuZF8xW1wiZGVmYXVsdFwiXS5nZXRCYWNrZW5kKCkuZ3JhZGVDb2x1bW5zLmdldFVzZXJHcmFkZXMocGFyYW1ldGVycykudGhlbihmdW5jdGlvbiAoaW5mb3JtYXRpb24pIHtcbiAgICAgICAgICBfdGhpczIuZ3JhZGVzID0gaW5mb3JtYXRpb247XG4gICAgICAgICAgcmVzb2x2ZShfdGhpczIuZ3JhZGVzKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwidXNlcklkXCIsXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICByZXR1cm4gdGhpcy5fdXNlcklkO1xuICAgIH1cbiAgfV0pO1xuXG4gIHJldHVybiBCQlVzZXI7XG59KCk7XG5cbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gQkJVc2VyOyIsIlwidXNlIHN0cmljdFwiO1xuXG5mdW5jdGlvbiBfdHlwZW9mKG9iaikgeyBpZiAodHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgPT09IFwic3ltYm9sXCIpIHsgX3R5cGVvZiA9IGZ1bmN0aW9uIF90eXBlb2Yob2JqKSB7IHJldHVybiB0eXBlb2Ygb2JqOyB9OyB9IGVsc2UgeyBfdHlwZW9mID0gZnVuY3Rpb24gX3R5cGVvZihvYmopIHsgcmV0dXJuIG9iaiAmJiB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb2JqLmNvbnN0cnVjdG9yID09PSBTeW1ib2wgJiYgb2JqICE9PSBTeW1ib2wucHJvdG90eXBlID8gXCJzeW1ib2xcIiA6IHR5cGVvZiBvYmo7IH07IH0gcmV0dXJuIF90eXBlb2Yob2JqKTsgfVxuXG5mdW5jdGlvbiBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybihzZWxmLCBjYWxsKSB7IGlmIChjYWxsICYmIChfdHlwZW9mKGNhbGwpID09PSBcIm9iamVjdFwiIHx8IHR5cGVvZiBjYWxsID09PSBcImZ1bmN0aW9uXCIpKSB7IHJldHVybiBjYWxsOyB9IHJldHVybiBfYXNzZXJ0VGhpc0luaXRpYWxpemVkKHNlbGYpOyB9XG5cbmZ1bmN0aW9uIF9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQoc2VsZikgeyBpZiAoc2VsZiA9PT0gdm9pZCAwKSB7IHRocm93IG5ldyBSZWZlcmVuY2VFcnJvcihcInRoaXMgaGFzbid0IGJlZW4gaW5pdGlhbGlzZWQgLSBzdXBlcigpIGhhc24ndCBiZWVuIGNhbGxlZFwiKTsgfSByZXR1cm4gc2VsZjsgfVxuXG5mdW5jdGlvbiBfZ2V0UHJvdG90eXBlT2YobykgeyBfZ2V0UHJvdG90eXBlT2YgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgPyBPYmplY3QuZ2V0UHJvdG90eXBlT2YgOiBmdW5jdGlvbiBfZ2V0UHJvdG90eXBlT2YobykgeyByZXR1cm4gby5fX3Byb3RvX18gfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKG8pOyB9OyByZXR1cm4gX2dldFByb3RvdHlwZU9mKG8pOyB9XG5cbmZ1bmN0aW9uIF9pbmhlcml0cyhzdWJDbGFzcywgc3VwZXJDbGFzcykgeyBpZiAodHlwZW9mIHN1cGVyQ2xhc3MgIT09IFwiZnVuY3Rpb25cIiAmJiBzdXBlckNsYXNzICE9PSBudWxsKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJTdXBlciBleHByZXNzaW9uIG11c3QgZWl0aGVyIGJlIG51bGwgb3IgYSBmdW5jdGlvblwiKTsgfSBzdWJDbGFzcy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MgJiYgc3VwZXJDbGFzcy5wcm90b3R5cGUsIHsgY29uc3RydWN0b3I6IHsgdmFsdWU6IHN1YkNsYXNzLCB3cml0YWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlIH0gfSk7IGlmIChzdXBlckNsYXNzKSBfc2V0UHJvdG90eXBlT2Yoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpOyB9XG5cbmZ1bmN0aW9uIF9zZXRQcm90b3R5cGVPZihvLCBwKSB7IF9zZXRQcm90b3R5cGVPZiA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fCBmdW5jdGlvbiBfc2V0UHJvdG90eXBlT2YobywgcCkgeyBvLl9fcHJvdG9fXyA9IHA7IHJldHVybiBvOyB9OyByZXR1cm4gX3NldFByb3RvdHlwZU9mKG8sIHApOyB9XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5cbmZ1bmN0aW9uIF9kZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHsgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykgeyB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldOyBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7IGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTsgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpOyB9IH1cblxuZnVuY3Rpb24gX2NyZWF0ZUNsYXNzKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykgeyBpZiAocHJvdG9Qcm9wcykgX2RlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTsgaWYgKHN0YXRpY1Byb3BzKSBfZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpOyByZXR1cm4gQ29uc3RydWN0b3I7IH1cblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIEJhY2tlbmRfMSA9IHJlcXVpcmUoXCIuL0JhY2tlbmRcIik7XG5cbnZhciBCQlVzZXJJbmZvID1cbi8qI19fUFVSRV9fKi9cbmZ1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gQkJVc2VySW5mbygpIHtcbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgQkJVc2VySW5mbyk7XG4gIH1cblxuICBfY3JlYXRlQ2xhc3MoQkJVc2VySW5mbywgW3tcbiAgICBrZXk6IFwiZ2V0Q3VycmVudFVzZXJJZFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBnZXRDdXJyZW50VXNlcklkKCkge1xuICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgQmFja2VuZF8xW1wiZGVmYXVsdFwiXS5nZXRCYWNrZW5kKCkudXNlcnMuZ2V0Q3VycmVudFVzZXJJZChudWxsKS50aGVuKGZ1bmN0aW9uICh1c2VyaWQpIHtcbiAgICAgICAgICByZXNvbHZlKHVzZXJpZCk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImdldFVzZXJOYW1lXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGdldFVzZXJOYW1lKCkge1xuICAgICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgaWYgKF90aGlzLl91c2VyTmFtZSkge1xuICAgICAgICAgIHJlc29sdmUoX3RoaXMuX3VzZXJOYW1lKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBfdGhpcy5nZXRVc2VySW5mbygpLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHJlc29sdmUoX3RoaXMuX3VzZXJOYW1lKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiZ2V0VXNlcklkXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGdldFVzZXJJZCgpIHtcbiAgICAgIHZhciBfdGhpczIgPSB0aGlzO1xuXG4gICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBpZiAoX3RoaXMyLl91c2VySWQpIHtcbiAgICAgICAgICByZXNvbHZlKF90aGlzMi5fdXNlcklkKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBfdGhpczIuZ2V0VXNlckluZm8oKS50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICByZXNvbHZlKF90aGlzMi5fdXNlcklkKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiZ2V0VXNlckluZm9cIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gZ2V0VXNlckluZm8oKSB7XG4gICAgICB2YXIgX3RoaXMzID0gdGhpcztcblxuICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgdmFyIHBhcmFtZXRlcnM7XG5cbiAgICAgICAgaWYgKF90aGlzMy51c2VySW5mbykge1xuICAgICAgICAgIHJlc29sdmUoX3RoaXMzLnVzZXJJbmZvKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoX3RoaXMzLl91c2VyTmFtZSkge1xuICAgICAgICAgIHBhcmFtZXRlcnMgPSB7XG4gICAgICAgICAgICB1c2VyTmFtZTogX3RoaXMzLl91c2VyTmFtZVxuICAgICAgICAgIH07XG4gICAgICAgIH0gZWxzZSBpZiAoX3RoaXMzLl91c2VySWQpIHtcbiAgICAgICAgICBwYXJhbWV0ZXJzID0ge1xuICAgICAgICAgICAgdXNlcklkOiBfdGhpczMuX3VzZXJJZFxuICAgICAgICAgIH07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQkJVc2VySW5mbzogZXhwZWN0aW5nIHVzZXJJZCBvciB1c2VyTmFtZSB0byBiZSBub3QgbnVsbC5cIik7XG4gICAgICAgIH1cblxuICAgICAgICBCYWNrZW5kXzFbXCJkZWZhdWx0XCJdLmdldEJhY2tlbmQoKS51c2Vycy5nZXRVc2VySW5mbyhwYXJhbWV0ZXJzKS50aGVuKGZ1bmN0aW9uIChpbmZvcm1hdGlvbikge1xuICAgICAgICAgIF90aGlzMy51c2VySW5mbyA9IGluZm9ybWF0aW9uO1xuICAgICAgICAgIF90aGlzMy5fdXNlcklkID0gX3RoaXMzLnVzZXJJbmZvLmlkO1xuICAgICAgICAgIF90aGlzMy5fdXNlck5hbWUgPSBfdGhpczMudXNlckluZm8udXNlcm5hbWU7XG4gICAgICAgICAgcmVzb2x2ZShfdGhpczMudXNlckluZm8pO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJnZXRFbnJvbGxlZENvdXJzZXNcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gZ2V0RW5yb2xsZWRDb3Vyc2VzKCkge1xuICAgICAgdmFyIF90aGlzNCA9IHRoaXM7XG5cbiAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGlmIChfdGhpczQuZW5yb2xsZWRDb3Vyc2VzKSB7XG4gICAgICAgICAgcmVzb2x2ZShfdGhpczQuZW5yb2xsZWRDb3Vyc2VzKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBfdGhpczQuZ2V0VXNlckluZm8oKS50aGVuKGZ1bmN0aW9uICh1aW5mbykge1xuICAgICAgICAgIHZhciBwYXJhbWV0ZXJzID0ge1xuICAgICAgICAgICAgb2Zmc2V0OiAwLFxuICAgICAgICAgICAgdXNlcklkOiB1aW5mby5pZFxuICAgICAgICAgIH07XG4gICAgICAgICAgQmFja2VuZF8xW1wiZGVmYXVsdFwiXS5nZXRCYWNrZW5kKCkuY291cnNlcy5nZXRFbnJvbGxlZENvdXJzZXMocGFyYW1ldGVycykudGhlbihmdW5jdGlvbiAoaW5mb3JtYXRpb24pIHtcbiAgICAgICAgICAgIF90aGlzNC5lbnJvbGxlZENvdXJzZXMgPSBpbmZvcm1hdGlvbjtcbiAgICAgICAgICAgIHJlc29sdmUoX3RoaXM0LmVucm9sbGVkQ291cnNlcyk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfVxuICB9XSk7XG5cbiAgcmV0dXJuIEJCVXNlckluZm87XG59KCk7XG5cbmV4cG9ydHMuQkJVc2VySW5mbyA9IEJCVXNlckluZm87XG5cbnZhciBCQlVzZXJJbmZvQnlJZCA9XG4vKiNfX1BVUkVfXyovXG5mdW5jdGlvbiAoX0JCVXNlckluZm8pIHtcbiAgX2luaGVyaXRzKEJCVXNlckluZm9CeUlkLCBfQkJVc2VySW5mbyk7XG5cbiAgZnVuY3Rpb24gQkJVc2VySW5mb0J5SWQodXNlcklkKSB7XG4gICAgdmFyIF90aGlzNTtcblxuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBCQlVzZXJJbmZvQnlJZCk7XG5cbiAgICBfdGhpczUgPSBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybih0aGlzLCBfZ2V0UHJvdG90eXBlT2YoQkJVc2VySW5mb0J5SWQpLmNhbGwodGhpcykpO1xuICAgIF90aGlzNS5fdXNlcklkID0gdXNlcklkO1xuICAgIHJldHVybiBfdGhpczU7XG4gIH1cblxuICByZXR1cm4gQkJVc2VySW5mb0J5SWQ7XG59KEJCVXNlckluZm8pO1xuXG5leHBvcnRzLkJCVXNlckluZm9CeUlkID0gQkJVc2VySW5mb0J5SWQ7XG5cbnZhciBCQlVzZXJJbmZvQnlVc2VybmFtZSA9XG4vKiNfX1BVUkVfXyovXG5mdW5jdGlvbiAoX0JCVXNlckluZm8yKSB7XG4gIF9pbmhlcml0cyhCQlVzZXJJbmZvQnlVc2VybmFtZSwgX0JCVXNlckluZm8yKTtcblxuICBmdW5jdGlvbiBCQlVzZXJJbmZvQnlVc2VybmFtZSh1c2VyTmFtZSkge1xuICAgIHZhciBfdGhpczY7XG5cbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgQkJVc2VySW5mb0J5VXNlcm5hbWUpO1xuXG4gICAgX3RoaXM2ID0gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4odGhpcywgX2dldFByb3RvdHlwZU9mKEJCVXNlckluZm9CeVVzZXJuYW1lKS5jYWxsKHRoaXMpKTtcbiAgICBfdGhpczYuX3VzZXJOYW1lID0gdXNlck5hbWU7XG4gICAgcmV0dXJuIF90aGlzNjtcbiAgfVxuXG4gIHJldHVybiBCQlVzZXJJbmZvQnlVc2VybmFtZTtcbn0oQkJVc2VySW5mbyk7XG5cbmV4cG9ydHMuQkJVc2VySW5mb0J5VXNlcm5hbWUgPSBCQlVzZXJJbmZvQnlVc2VybmFtZTsiLCJcInVzZSBzdHJpY3RcIjtcblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxuZnVuY3Rpb24gX2RlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7IHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07IGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTsgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlOyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7IH0gfVxuXG5mdW5jdGlvbiBfY3JlYXRlQ2xhc3MoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7IGlmIChwcm90b1Byb3BzKSBfZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpOyBpZiAoc3RhdGljUHJvcHMpIF9kZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7IHJldHVybiBDb25zdHJ1Y3RvcjsgfVxuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgQmFja2VuZCA9XG4vKiNfX1BVUkVfXyovXG5mdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIEJhY2tlbmQoKSB7XG4gICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIEJhY2tlbmQpO1xuICB9XG5cbiAgX2NyZWF0ZUNsYXNzKEJhY2tlbmQsIG51bGwsIFt7XG4gICAga2V5OiBcInNldEJhY2tlbmRcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gc2V0QmFja2VuZChiYWNrZW5kKSB7XG4gICAgICB0aGlzLmJhY2tlbmQgPSBiYWNrZW5kO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJnZXRCYWNrZW5kXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGdldEJhY2tlbmQoKSB7XG4gICAgICBpZiAoIXRoaXMuYmFja2VuZCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJFcnJvcjogISEhQmFja2VuZCBub3Qgc2V0ISEhXCIpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcy5iYWNrZW5kO1xuICAgIH1cbiAgfV0pO1xuXG4gIHJldHVybiBCYWNrZW5kO1xufSgpO1xuXG5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IEJhY2tlbmQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBCYWNrZW5kXzEgPSByZXF1aXJlKFwiLi9CYWNrZW5kXCIpO1xuXG5leHBvcnRzLkJhY2tlbmQgPSBCYWNrZW5kXzFbXCJkZWZhdWx0XCJdO1xuXG52YXIgQkJBc3NpZ25tZW50QXR0ZW1wdF8xID0gcmVxdWlyZShcIi4vQkJBc3NpZ25tZW50QXR0ZW1wdFwiKTtcblxuZXhwb3J0cy5CQkFzc2lnbm1lbnRBdHRlbXB0ID0gQkJBc3NpZ25tZW50QXR0ZW1wdF8xW1wiZGVmYXVsdFwiXTtcblxudmFyIEJCQ291cnNlXzEgPSByZXF1aXJlKFwiLi9CQkNvdXJzZVwiKTtcblxuZXhwb3J0cy5CQkNvdXJzZSA9IEJCQ291cnNlXzFbXCJkZWZhdWx0XCJdO1xuXG52YXIgQkJFbWFpbF8xID0gcmVxdWlyZShcIi4vQkJFbWFpbFwiKTtcblxuZXhwb3J0cy5CQkVtYWlsID0gQkJFbWFpbF8xW1wiZGVmYXVsdFwiXTtcblxudmFyIEJCRmlsZV8xID0gcmVxdWlyZShcIi4vQkJGaWxlXCIpO1xuXG5leHBvcnRzLkJCRmlsZSA9IEJCRmlsZV8xW1wiZGVmYXVsdFwiXTtcblxudmFyIEJCR3JhZGVDb2x1bW5fMSA9IHJlcXVpcmUoXCIuL0JCR3JhZGVDb2x1bW5cIik7XG5cbmV4cG9ydHMuQkJHcmFkZUNvbHVtbiA9IEJCR3JhZGVDb2x1bW5fMVtcImRlZmF1bHRcIl07XG5cbnZhciBCQkdyb3VwXzEgPSByZXF1aXJlKFwiLi9CQkdyb3VwXCIpO1xuXG5leHBvcnRzLkJCR3JvdXAgPSBCQkdyb3VwXzFbXCJkZWZhdWx0XCJdO1xuXG52YXIgQkJVc2VyXzEgPSByZXF1aXJlKFwiLi9CQlVzZXJcIik7XG5cbmV4cG9ydHMuQkJVc2VyID0gQkJVc2VyXzFbXCJkZWZhdWx0XCJdO1xuXG52YXIgQkJVc2VySW5mb18xID0gcmVxdWlyZShcIi4vQkJVc2VySW5mb1wiKTtcblxuZXhwb3J0cy5CQlVzZXJJbmZvID0gQkJVc2VySW5mb18xLkJCVXNlckluZm87XG5leHBvcnRzLkJCVXNlckluZm9CeUlkID0gQkJVc2VySW5mb18xLkJCVXNlckluZm9CeUlkO1xuZXhwb3J0cy5CQlVzZXJJbmZvQnlVc2VybmFtZSA9IEJCVXNlckluZm9fMS5CQlVzZXJJbmZvQnlVc2VybmFtZTsiLCJcInVzZSBzdHJpY3RcIjtcblxuZnVuY3Rpb24gX3R5cGVvZihvYmopIHsgaWYgKHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiB0eXBlb2YgU3ltYm9sLml0ZXJhdG9yID09PSBcInN5bWJvbFwiKSB7IF90eXBlb2YgPSBmdW5jdGlvbiBfdHlwZW9mKG9iaikgeyByZXR1cm4gdHlwZW9mIG9iajsgfTsgfSBlbHNlIHsgX3R5cGVvZiA9IGZ1bmN0aW9uIF90eXBlb2Yob2JqKSB7IHJldHVybiBvYmogJiYgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9iai5jb25zdHJ1Y3RvciA9PT0gU3ltYm9sICYmIG9iaiAhPT0gU3ltYm9sLnByb3RvdHlwZSA/IFwic3ltYm9sXCIgOiB0eXBlb2Ygb2JqOyB9OyB9IHJldHVybiBfdHlwZW9mKG9iaik7IH1cblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxuZnVuY3Rpb24gX2RlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7IHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07IGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTsgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlOyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7IH0gfVxuXG5mdW5jdGlvbiBfY3JlYXRlQ2xhc3MoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7IGlmIChwcm90b1Byb3BzKSBfZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpOyBpZiAoc3RhdGljUHJvcHMpIF9kZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7IHJldHVybiBDb25zdHJ1Y3RvcjsgfVxuXG5mdW5jdGlvbiBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybihzZWxmLCBjYWxsKSB7IGlmIChjYWxsICYmIChfdHlwZW9mKGNhbGwpID09PSBcIm9iamVjdFwiIHx8IHR5cGVvZiBjYWxsID09PSBcImZ1bmN0aW9uXCIpKSB7IHJldHVybiBjYWxsOyB9IHJldHVybiBfYXNzZXJ0VGhpc0luaXRpYWxpemVkKHNlbGYpOyB9XG5cbmZ1bmN0aW9uIF9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQoc2VsZikgeyBpZiAoc2VsZiA9PT0gdm9pZCAwKSB7IHRocm93IG5ldyBSZWZlcmVuY2VFcnJvcihcInRoaXMgaGFzbid0IGJlZW4gaW5pdGlhbGlzZWQgLSBzdXBlcigpIGhhc24ndCBiZWVuIGNhbGxlZFwiKTsgfSByZXR1cm4gc2VsZjsgfVxuXG5mdW5jdGlvbiBfZ2V0UHJvdG90eXBlT2YobykgeyBfZ2V0UHJvdG90eXBlT2YgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgPyBPYmplY3QuZ2V0UHJvdG90eXBlT2YgOiBmdW5jdGlvbiBfZ2V0UHJvdG90eXBlT2YobykgeyByZXR1cm4gby5fX3Byb3RvX18gfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKG8pOyB9OyByZXR1cm4gX2dldFByb3RvdHlwZU9mKG8pOyB9XG5cbmZ1bmN0aW9uIF9pbmhlcml0cyhzdWJDbGFzcywgc3VwZXJDbGFzcykgeyBpZiAodHlwZW9mIHN1cGVyQ2xhc3MgIT09IFwiZnVuY3Rpb25cIiAmJiBzdXBlckNsYXNzICE9PSBudWxsKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJTdXBlciBleHByZXNzaW9uIG11c3QgZWl0aGVyIGJlIG51bGwgb3IgYSBmdW5jdGlvblwiKTsgfSBzdWJDbGFzcy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MgJiYgc3VwZXJDbGFzcy5wcm90b3R5cGUsIHsgY29uc3RydWN0b3I6IHsgdmFsdWU6IHN1YkNsYXNzLCB3cml0YWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlIH0gfSk7IGlmIChzdXBlckNsYXNzKSBfc2V0UHJvdG90eXBlT2Yoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpOyB9XG5cbmZ1bmN0aW9uIF9zZXRQcm90b3R5cGVPZihvLCBwKSB7IF9zZXRQcm90b3R5cGVPZiA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fCBmdW5jdGlvbiBfc2V0UHJvdG90eXBlT2YobywgcCkgeyBvLl9fcHJvdG9fXyA9IHA7IHJldHVybiBvOyB9OyByZXR1cm4gX3NldFByb3RvdHlwZU9mKG8sIHApOyB9XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBjb3Vyc2VzXzEgPSByZXF1aXJlKFwiLi4vLi4vY29tbW9uL0JCQWJzdHJhY3RCYWNrZW5kL2NvdXJzZXNcIik7XG5cbnZhciBCQkNvdXJzZXMgPVxuLyojX19QVVJFX18qL1xuZnVuY3Rpb24gKF9jb3Vyc2VzXzEkZGVmYXVsdCkge1xuICBfaW5oZXJpdHMoQkJDb3Vyc2VzLCBfY291cnNlc18xJGRlZmF1bHQpO1xuXG4gIGZ1bmN0aW9uIEJCQ291cnNlcyhjYXRlZ29yeSwgYmFja2VuZCkge1xuICAgIHZhciBfdGhpcztcblxuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBCQkNvdXJzZXMpO1xuXG4gICAgX3RoaXMgPSBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybih0aGlzLCBfZ2V0UHJvdG90eXBlT2YoQkJDb3Vyc2VzKS5jYWxsKHRoaXMpKTtcbiAgICBfdGhpcy5iYWNrZW5kID0gYmFja2VuZDtcbiAgICBfdGhpcy5jYXRlZ29yeSA9IGNhdGVnb3J5O1xuICAgIHJldHVybiBfdGhpcztcbiAgfVxuXG4gIF9jcmVhdGVDbGFzcyhCQkNvdXJzZXMsIFt7XG4gICAga2V5OiBcImdldEVucm9sbGVkQ291cnNlc1wiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBnZXRFbnJvbGxlZENvdXJzZXMocGFyYW1ldGVycykge1xuICAgICAgcmV0dXJuIHRoaXMuYmFja2VuZC5zZW5kTWVzc2FnZVRocm91Z2hDb25uZWN0aW9uTWFuYWdlcih0aGlzLmNhdGVnb3J5LCBcImdldEVucm9sbGVkQ291cnNlc1wiLCBwYXJhbWV0ZXJzKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiZ2V0Q291cnNlSW5mb3JtYXRpb25cIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gZ2V0Q291cnNlSW5mb3JtYXRpb24ocGFyYW1ldGVycykge1xuICAgICAgcmV0dXJuIHRoaXMuYmFja2VuZC5zZW5kTWVzc2FnZVRocm91Z2hDb25uZWN0aW9uTWFuYWdlcih0aGlzLmNhdGVnb3J5LCBcImdldENvdXJzZUluZm9ybWF0aW9uXCIsIHBhcmFtZXRlcnMpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJwb3N0Q291cnNlXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHBvc3RDb3Vyc2UoKSB7XG4gICAgICByZXR1cm4gdGhpcy5iYWNrZW5kLnNlbmRNZXNzYWdlVGhyb3VnaENvbm5lY3Rpb25NYW5hZ2VyKHRoaXMuY2F0ZWdvcnksIFwicG9zdENvdXJzZVwiKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiZGVsZXRlQ291cnNlXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGRlbGV0ZUNvdXJzZShwYXJhbWV0ZXJzKSB7XG4gICAgICByZXR1cm4gdGhpcy5iYWNrZW5kLnNlbmRNZXNzYWdlVGhyb3VnaENvbm5lY3Rpb25NYW5hZ2VyKHRoaXMuY2F0ZWdvcnksIFwiZGVsZXRlQ291cnNlXCIsIHBhcmFtZXRlcnMpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJwYXRjaENvdXJzZVwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBwYXRjaENvdXJzZShwYXJhbWV0ZXJzKSB7XG4gICAgICByZXR1cm4gdGhpcy5iYWNrZW5kLnNlbmRNZXNzYWdlVGhyb3VnaENvbm5lY3Rpb25NYW5hZ2VyKHRoaXMuY2F0ZWdvcnksIFwicGF0Y2hDb3Vyc2VcIiwgcGFyYW1ldGVycyk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImdldENvdXJzZUNvbnRlbnRzXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGdldENvdXJzZUNvbnRlbnRzKHBhcmFtZXRlcnMpIHtcbiAgICAgIHJldHVybiB0aGlzLmJhY2tlbmQuc2VuZE1lc3NhZ2VUaHJvdWdoQ29ubmVjdGlvbk1hbmFnZXIodGhpcy5jYXRlZ29yeSwgXCJnZXRDb3Vyc2VDb250ZW50c1wiLCBwYXJhbWV0ZXJzKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiZ2V0Q291cnNlQ29udGVudFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBnZXRDb3Vyc2VDb250ZW50KHBhcmFtZXRlcnMpIHtcbiAgICAgIHJldHVybiB0aGlzLmJhY2tlbmQuc2VuZE1lc3NhZ2VUaHJvdWdoQ29ubmVjdGlvbk1hbmFnZXIodGhpcy5jYXRlZ29yeSwgXCJnZXRDb3Vyc2VDb250ZW50XCIsIHBhcmFtZXRlcnMpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJnZXRDb3Vyc2VDb250ZW50Q2hpbGRyZW5cIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gZ2V0Q291cnNlQ29udGVudENoaWxkcmVuKHBhcmFtZXRlcnMpIHtcbiAgICAgIHJldHVybiB0aGlzLmJhY2tlbmQuc2VuZE1lc3NhZ2VUaHJvdWdoQ29ubmVjdGlvbk1hbmFnZXIodGhpcy5jYXRlZ29yeSwgXCJnZXRDb3Vyc2VDb250ZW50Q2hpbGRyZW5cIiwgcGFyYW1ldGVycyk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcInBvc3RDb3Vyc2VDb250ZW50XCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHBvc3RDb3Vyc2VDb250ZW50KHBhcmFtZXRlcnMpIHtcbiAgICAgIHJldHVybiB0aGlzLmJhY2tlbmQuc2VuZE1lc3NhZ2VUaHJvdWdoQ29ubmVjdGlvbk1hbmFnZXIodGhpcy5jYXRlZ29yeSwgXCJwb3N0Q291cnNlQ29udGVudFwiLCBwYXJhbWV0ZXJzKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwicG9zdENvdXJzZUNvbnRlbnRDaGlsZHJlblwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBwb3N0Q291cnNlQ29udGVudENoaWxkcmVuKHBhcmFtZXRlcnMpIHtcbiAgICAgIHJldHVybiB0aGlzLmJhY2tlbmQuc2VuZE1lc3NhZ2VUaHJvdWdoQ29ubmVjdGlvbk1hbmFnZXIodGhpcy5jYXRlZ29yeSwgXCJwb3N0Q291cnNlQ29udGVudENoaWxkcmVuXCIsIHBhcmFtZXRlcnMpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJkZWxldGVDb3Vyc2VDb250ZW50XCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGRlbGV0ZUNvdXJzZUNvbnRlbnQocGFyYW1ldGVycykge1xuICAgICAgcmV0dXJuIHRoaXMuYmFja2VuZC5zZW5kTWVzc2FnZVRocm91Z2hDb25uZWN0aW9uTWFuYWdlcih0aGlzLmNhdGVnb3J5LCBcImRlbGV0ZUNvdXJzZUNvbnRlbnRcIiwgcGFyYW1ldGVycyk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcInBhdGNoQ291cnNlQ29udGVudFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBwYXRjaENvdXJzZUNvbnRlbnQocGFyYW1ldGVycykge1xuICAgICAgcmV0dXJuIHRoaXMuYmFja2VuZC5zZW5kTWVzc2FnZVRocm91Z2hDb25uZWN0aW9uTWFuYWdlcih0aGlzLmNhdGVnb3J5LCBcInBhdGNoQ291cnNlQ29udGVudFwiLCBwYXJhbWV0ZXJzKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiZ2V0Q291cnNlQ2hpbGRyZW5cIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gZ2V0Q291cnNlQ2hpbGRyZW4ocGFyYW1ldGVycykge1xuICAgICAgcmV0dXJuIHRoaXMuYmFja2VuZC5zZW5kTWVzc2FnZVRocm91Z2hDb25uZWN0aW9uTWFuYWdlcih0aGlzLmNhdGVnb3J5LCBcImdldENvdXJzZUNoaWxkcmVuXCIsIHBhcmFtZXRlcnMpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJnZXRBc3NpZ25tZW50Q29sc1wiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBnZXRBc3NpZ25tZW50Q29scyhwYXJhbWV0ZXJzKSB7XG4gICAgICByZXR1cm4gdGhpcy5iYWNrZW5kLnNlbmRNZXNzYWdlVGhyb3VnaENvbm5lY3Rpb25NYW5hZ2VyKHRoaXMuY2F0ZWdvcnksIFwiZ2V0QXNzaWdubWVudENvbHNcIiwgcGFyYW1ldGVycyk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImdldEFubm91bmNlbWVudHNcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gZ2V0QW5ub3VuY2VtZW50cyhwYXJhbWV0ZXJzKSB7XG4gICAgICByZXR1cm4gdGhpcy5iYWNrZW5kLnNlbmRNZXNzYWdlVGhyb3VnaENvbm5lY3Rpb25NYW5hZ2VyKHRoaXMuY2F0ZWdvcnksIFwiZ2V0QW5ub3VuY2VtZW50c1wiLCBwYXJhbWV0ZXJzKTtcbiAgICB9XG4gIH1dKTtcblxuICByZXR1cm4gQkJDb3Vyc2VzO1xufShjb3Vyc2VzXzFbXCJkZWZhdWx0XCJdKTtcblxuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBCQkNvdXJzZXM7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmZ1bmN0aW9uIF90eXBlb2Yob2JqKSB7IGlmICh0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgdHlwZW9mIFN5bWJvbC5pdGVyYXRvciA9PT0gXCJzeW1ib2xcIikgeyBfdHlwZW9mID0gZnVuY3Rpb24gX3R5cGVvZihvYmopIHsgcmV0dXJuIHR5cGVvZiBvYmo7IH07IH0gZWxzZSB7IF90eXBlb2YgPSBmdW5jdGlvbiBfdHlwZW9mKG9iaikgeyByZXR1cm4gb2JqICYmIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvYmouY29uc3RydWN0b3IgPT09IFN5bWJvbCAmJiBvYmogIT09IFN5bWJvbC5wcm90b3R5cGUgPyBcInN5bWJvbFwiIDogdHlwZW9mIG9iajsgfTsgfSByZXR1cm4gX3R5cGVvZihvYmopOyB9XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5cbmZ1bmN0aW9uIF9kZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHsgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykgeyB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldOyBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7IGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTsgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpOyB9IH1cblxuZnVuY3Rpb24gX2NyZWF0ZUNsYXNzKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykgeyBpZiAocHJvdG9Qcm9wcykgX2RlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTsgaWYgKHN0YXRpY1Byb3BzKSBfZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpOyByZXR1cm4gQ29uc3RydWN0b3I7IH1cblxuZnVuY3Rpb24gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4oc2VsZiwgY2FsbCkgeyBpZiAoY2FsbCAmJiAoX3R5cGVvZihjYWxsKSA9PT0gXCJvYmplY3RcIiB8fCB0eXBlb2YgY2FsbCA9PT0gXCJmdW5jdGlvblwiKSkgeyByZXR1cm4gY2FsbDsgfSByZXR1cm4gX2Fzc2VydFRoaXNJbml0aWFsaXplZChzZWxmKTsgfVxuXG5mdW5jdGlvbiBfYXNzZXJ0VGhpc0luaXRpYWxpemVkKHNlbGYpIHsgaWYgKHNlbGYgPT09IHZvaWQgMCkgeyB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoXCJ0aGlzIGhhc24ndCBiZWVuIGluaXRpYWxpc2VkIC0gc3VwZXIoKSBoYXNuJ3QgYmVlbiBjYWxsZWRcIik7IH0gcmV0dXJuIHNlbGY7IH1cblxuZnVuY3Rpb24gX2dldFByb3RvdHlwZU9mKG8pIHsgX2dldFByb3RvdHlwZU9mID0gT2JqZWN0LnNldFByb3RvdHlwZU9mID8gT2JqZWN0LmdldFByb3RvdHlwZU9mIDogZnVuY3Rpb24gX2dldFByb3RvdHlwZU9mKG8pIHsgcmV0dXJuIG8uX19wcm90b19fIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihvKTsgfTsgcmV0dXJuIF9nZXRQcm90b3R5cGVPZihvKTsgfVxuXG5mdW5jdGlvbiBfaW5oZXJpdHMoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHsgaWYgKHR5cGVvZiBzdXBlckNsYXNzICE9PSBcImZ1bmN0aW9uXCIgJiYgc3VwZXJDbGFzcyAhPT0gbnVsbCkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3VwZXIgZXhwcmVzc2lvbiBtdXN0IGVpdGhlciBiZSBudWxsIG9yIGEgZnVuY3Rpb25cIik7IH0gc3ViQ2xhc3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzICYmIHN1cGVyQ2xhc3MucHJvdG90eXBlLCB7IGNvbnN0cnVjdG9yOiB7IHZhbHVlOiBzdWJDbGFzcywgd3JpdGFibGU6IHRydWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSB9IH0pOyBpZiAoc3VwZXJDbGFzcykgX3NldFByb3RvdHlwZU9mKHN1YkNsYXNzLCBzdXBlckNsYXNzKTsgfVxuXG5mdW5jdGlvbiBfc2V0UHJvdG90eXBlT2YobywgcCkgeyBfc2V0UHJvdG90eXBlT2YgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHwgZnVuY3Rpb24gX3NldFByb3RvdHlwZU9mKG8sIHApIHsgby5fX3Byb3RvX18gPSBwOyByZXR1cm4gbzsgfTsgcmV0dXJuIF9zZXRQcm90b3R5cGVPZihvLCBwKTsgfVxuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgZW1haWxfMSA9IHJlcXVpcmUoXCIuLi8uLi9jb21tb24vQkJBYnN0cmFjdEJhY2tlbmQvZW1haWxcIik7XG5cbnZhciBCQkVtYWlscyA9XG4vKiNfX1BVUkVfXyovXG5mdW5jdGlvbiAoX2VtYWlsXzEkZGVmYXVsdCkge1xuICBfaW5oZXJpdHMoQkJFbWFpbHMsIF9lbWFpbF8xJGRlZmF1bHQpO1xuXG4gIGZ1bmN0aW9uIEJCRW1haWxzKGNhdGVnb3J5LCBiYWNrZW5kKSB7XG4gICAgdmFyIF90aGlzO1xuXG4gICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIEJCRW1haWxzKTtcblxuICAgIF90aGlzID0gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4odGhpcywgX2dldFByb3RvdHlwZU9mKEJCRW1haWxzKS5jYWxsKHRoaXMpKTtcbiAgICBfdGhpcy5iYWNrZW5kID0gYmFja2VuZDtcbiAgICBfdGhpcy5jYXRlZ29yeSA9IGNhdGVnb3J5O1xuICAgIHJldHVybiBfdGhpcztcbiAgfVxuXG4gIF9jcmVhdGVDbGFzcyhCQkVtYWlscywgW3tcbiAgICBrZXk6IFwic2VuZE1haWxcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gc2VuZE1haWwocGFyYW1ldGVycykge1xuICAgICAgcmV0dXJuIHRoaXMuYmFja2VuZC5zZW5kTWVzc2FnZVRocm91Z2hDb25uZWN0aW9uTWFuYWdlcih0aGlzLmNhdGVnb3J5LCBcInNlbmRNYWlsXCIsIHBhcmFtZXRlcnMpO1xuICAgIH1cbiAgfV0pO1xuXG4gIHJldHVybiBCQkVtYWlscztcbn0oZW1haWxfMVtcImRlZmF1bHRcIl0pO1xuXG5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IEJCRW1haWxzOyIsIlwidXNlIHN0cmljdFwiO1xuXG5mdW5jdGlvbiBfdHlwZW9mKG9iaikgeyBpZiAodHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgPT09IFwic3ltYm9sXCIpIHsgX3R5cGVvZiA9IGZ1bmN0aW9uIF90eXBlb2Yob2JqKSB7IHJldHVybiB0eXBlb2Ygb2JqOyB9OyB9IGVsc2UgeyBfdHlwZW9mID0gZnVuY3Rpb24gX3R5cGVvZihvYmopIHsgcmV0dXJuIG9iaiAmJiB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb2JqLmNvbnN0cnVjdG9yID09PSBTeW1ib2wgJiYgb2JqICE9PSBTeW1ib2wucHJvdG90eXBlID8gXCJzeW1ib2xcIiA6IHR5cGVvZiBvYmo7IH07IH0gcmV0dXJuIF90eXBlb2Yob2JqKTsgfVxuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG5mdW5jdGlvbiBfZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7IGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHsgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTsgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlOyBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7IGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTsgfSB9XG5cbmZ1bmN0aW9uIF9jcmVhdGVDbGFzcyhDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHsgaWYgKHByb3RvUHJvcHMpIF9kZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7IGlmIChzdGF0aWNQcm9wcykgX2RlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTsgcmV0dXJuIENvbnN0cnVjdG9yOyB9XG5cbmZ1bmN0aW9uIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHNlbGYsIGNhbGwpIHsgaWYgKGNhbGwgJiYgKF90eXBlb2YoY2FsbCkgPT09IFwib2JqZWN0XCIgfHwgdHlwZW9mIGNhbGwgPT09IFwiZnVuY3Rpb25cIikpIHsgcmV0dXJuIGNhbGw7IH0gcmV0dXJuIF9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQoc2VsZik7IH1cblxuZnVuY3Rpb24gX2Fzc2VydFRoaXNJbml0aWFsaXplZChzZWxmKSB7IGlmIChzZWxmID09PSB2b2lkIDApIHsgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKFwidGhpcyBoYXNuJ3QgYmVlbiBpbml0aWFsaXNlZCAtIHN1cGVyKCkgaGFzbid0IGJlZW4gY2FsbGVkXCIpOyB9IHJldHVybiBzZWxmOyB9XG5cbmZ1bmN0aW9uIF9nZXRQcm90b3R5cGVPZihvKSB7IF9nZXRQcm90b3R5cGVPZiA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiA/IE9iamVjdC5nZXRQcm90b3R5cGVPZiA6IGZ1bmN0aW9uIF9nZXRQcm90b3R5cGVPZihvKSB7IHJldHVybiBvLl9fcHJvdG9fXyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2Yobyk7IH07IHJldHVybiBfZ2V0UHJvdG90eXBlT2Yobyk7IH1cblxuZnVuY3Rpb24gX2luaGVyaXRzKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7IGlmICh0eXBlb2Ygc3VwZXJDbGFzcyAhPT0gXCJmdW5jdGlvblwiICYmIHN1cGVyQ2xhc3MgIT09IG51bGwpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN1cGVyIGV4cHJlc3Npb24gbXVzdCBlaXRoZXIgYmUgbnVsbCBvciBhIGZ1bmN0aW9uXCIpOyB9IHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcyAmJiBzdXBlckNsYXNzLnByb3RvdHlwZSwgeyBjb25zdHJ1Y3RvcjogeyB2YWx1ZTogc3ViQ2xhc3MsIHdyaXRhYmxlOiB0cnVlLCBjb25maWd1cmFibGU6IHRydWUgfSB9KTsgaWYgKHN1cGVyQ2xhc3MpIF9zZXRQcm90b3R5cGVPZihzdWJDbGFzcywgc3VwZXJDbGFzcyk7IH1cblxuZnVuY3Rpb24gX3NldFByb3RvdHlwZU9mKG8sIHApIHsgX3NldFByb3RvdHlwZU9mID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8IGZ1bmN0aW9uIF9zZXRQcm90b3R5cGVPZihvLCBwKSB7IG8uX19wcm90b19fID0gcDsgcmV0dXJuIG87IH07IHJldHVybiBfc2V0UHJvdG90eXBlT2YobywgcCk7IH1cblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIGZpbGVzXzEgPSByZXF1aXJlKFwiLi4vLi4vY29tbW9uL0JCQWJzdHJhY3RCYWNrZW5kL2ZpbGVzXCIpO1xuXG52YXIgQkJGaWxlcyA9XG4vKiNfX1BVUkVfXyovXG5mdW5jdGlvbiAoX2ZpbGVzXzEkZGVmYXVsdCkge1xuICBfaW5oZXJpdHMoQkJGaWxlcywgX2ZpbGVzXzEkZGVmYXVsdCk7XG5cbiAgZnVuY3Rpb24gQkJGaWxlcyhjYXRlZ29yeSwgYmFja2VuZCkge1xuICAgIHZhciBfdGhpcztcblxuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBCQkZpbGVzKTtcblxuICAgIF90aGlzID0gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4odGhpcywgX2dldFByb3RvdHlwZU9mKEJCRmlsZXMpLmNhbGwodGhpcykpO1xuICAgIF90aGlzLmJhY2tlbmQgPSBiYWNrZW5kO1xuICAgIF90aGlzLmNhdGVnb3J5ID0gY2F0ZWdvcnk7XG4gICAgcmV0dXJuIF90aGlzO1xuICB9XG5cbiAgX2NyZWF0ZUNsYXNzKEJCRmlsZXMsIFt7XG4gICAga2V5OiBcImdldEZpbGVJbmZvXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGdldEZpbGVJbmZvKHBhcmFtZXRlcnMpIHtcbiAgICAgIHJldHVybiB0aGlzLmJhY2tlbmQuc2VuZE1lc3NhZ2VUaHJvdWdoQ29ubmVjdGlvbk1hbmFnZXIodGhpcy5jYXRlZ29yeSwgXCJnZXRGaWxlSW5mb1wiLCBwYXJhbWV0ZXJzKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiY3JlYXRlRm9sZGVyXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGNyZWF0ZUZvbGRlcihwYXJhbWV0ZXJzKSB7XG4gICAgICByZXR1cm4gdGhpcy5iYWNrZW5kLnNlbmRNZXNzYWdlVGhyb3VnaENvbm5lY3Rpb25NYW5hZ2VyKHRoaXMuY2F0ZWdvcnksIFwiY3JlYXRlRm9sZGVyXCIsIHBhcmFtZXRlcnMpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJkZWxldGVGaWxlXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGRlbGV0ZUZpbGUocGFyYW1ldGVycykge1xuICAgICAgcmV0dXJuIHRoaXMuYmFja2VuZC5zZW5kTWVzc2FnZVRocm91Z2hDb25uZWN0aW9uTWFuYWdlcih0aGlzLmNhdGVnb3J5LCBcImRlbGV0ZUZpbGVcIiwgcGFyYW1ldGVycyk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImRvd25sb2FkRmlsZVwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBkb3dubG9hZEZpbGUocGFyYW1ldGVycykge1xuICAgICAgcmV0dXJuIHRoaXMuYmFja2VuZC5zZW5kTWVzc2FnZVRocm91Z2hDb25uZWN0aW9uTWFuYWdlcih0aGlzLmNhdGVnb3J5LCBcImRvd25sb2FkRmlsZVwiLCBwYXJhbWV0ZXJzKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwicHVibGlzaEZpbGVcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gcHVibGlzaEZpbGUocGFyYW1ldGVycykge1xuICAgICAgcmV0dXJuIHRoaXMuYmFja2VuZC5zZW5kTWVzc2FnZVRocm91Z2hDb25uZWN0aW9uTWFuYWdlcih0aGlzLmNhdGVnb3J5LCBcInB1Ymxpc2hGaWxlXCIsIHBhcmFtZXRlcnMpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJzZXRQZXJtaXNzaW9uc1wiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBzZXRQZXJtaXNzaW9ucyhwYXJhbWV0ZXJzKSB7XG4gICAgICByZXR1cm4gdGhpcy5iYWNrZW5kLnNlbmRNZXNzYWdlVGhyb3VnaENvbm5lY3Rpb25NYW5hZ2VyKHRoaXMuY2F0ZWdvcnksIFwic2V0UGVybWlzc2lvbnNcIiwgcGFyYW1ldGVycyk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcInVwbG9hZEZpbGVcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gdXBsb2FkRmlsZShwYXJhbWV0ZXJzKSB7XG4gICAgICByZXR1cm4gdGhpcy5iYWNrZW5kLnNlbmRNZXNzYWdlVGhyb3VnaENvbm5lY3Rpb25NYW5hZ2VyKHRoaXMuY2F0ZWdvcnksIFwidXBsb2FkRmlsZVwiLCBwYXJhbWV0ZXJzKTtcbiAgICB9XG4gIH1dKTtcblxuICByZXR1cm4gQkJGaWxlcztcbn0oZmlsZXNfMVtcImRlZmF1bHRcIl0pO1xuXG5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IEJCRmlsZXM7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmZ1bmN0aW9uIF90eXBlb2Yob2JqKSB7IGlmICh0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgdHlwZW9mIFN5bWJvbC5pdGVyYXRvciA9PT0gXCJzeW1ib2xcIikgeyBfdHlwZW9mID0gZnVuY3Rpb24gX3R5cGVvZihvYmopIHsgcmV0dXJuIHR5cGVvZiBvYmo7IH07IH0gZWxzZSB7IF90eXBlb2YgPSBmdW5jdGlvbiBfdHlwZW9mKG9iaikgeyByZXR1cm4gb2JqICYmIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvYmouY29uc3RydWN0b3IgPT09IFN5bWJvbCAmJiBvYmogIT09IFN5bWJvbC5wcm90b3R5cGUgPyBcInN5bWJvbFwiIDogdHlwZW9mIG9iajsgfTsgfSByZXR1cm4gX3R5cGVvZihvYmopOyB9XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5cbmZ1bmN0aW9uIF9kZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHsgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykgeyB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldOyBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7IGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTsgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpOyB9IH1cblxuZnVuY3Rpb24gX2NyZWF0ZUNsYXNzKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykgeyBpZiAocHJvdG9Qcm9wcykgX2RlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTsgaWYgKHN0YXRpY1Byb3BzKSBfZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpOyByZXR1cm4gQ29uc3RydWN0b3I7IH1cblxuZnVuY3Rpb24gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4oc2VsZiwgY2FsbCkgeyBpZiAoY2FsbCAmJiAoX3R5cGVvZihjYWxsKSA9PT0gXCJvYmplY3RcIiB8fCB0eXBlb2YgY2FsbCA9PT0gXCJmdW5jdGlvblwiKSkgeyByZXR1cm4gY2FsbDsgfSByZXR1cm4gX2Fzc2VydFRoaXNJbml0aWFsaXplZChzZWxmKTsgfVxuXG5mdW5jdGlvbiBfYXNzZXJ0VGhpc0luaXRpYWxpemVkKHNlbGYpIHsgaWYgKHNlbGYgPT09IHZvaWQgMCkgeyB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoXCJ0aGlzIGhhc24ndCBiZWVuIGluaXRpYWxpc2VkIC0gc3VwZXIoKSBoYXNuJ3QgYmVlbiBjYWxsZWRcIik7IH0gcmV0dXJuIHNlbGY7IH1cblxuZnVuY3Rpb24gX2dldFByb3RvdHlwZU9mKG8pIHsgX2dldFByb3RvdHlwZU9mID0gT2JqZWN0LnNldFByb3RvdHlwZU9mID8gT2JqZWN0LmdldFByb3RvdHlwZU9mIDogZnVuY3Rpb24gX2dldFByb3RvdHlwZU9mKG8pIHsgcmV0dXJuIG8uX19wcm90b19fIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihvKTsgfTsgcmV0dXJuIF9nZXRQcm90b3R5cGVPZihvKTsgfVxuXG5mdW5jdGlvbiBfaW5oZXJpdHMoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHsgaWYgKHR5cGVvZiBzdXBlckNsYXNzICE9PSBcImZ1bmN0aW9uXCIgJiYgc3VwZXJDbGFzcyAhPT0gbnVsbCkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3VwZXIgZXhwcmVzc2lvbiBtdXN0IGVpdGhlciBiZSBudWxsIG9yIGEgZnVuY3Rpb25cIik7IH0gc3ViQ2xhc3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzICYmIHN1cGVyQ2xhc3MucHJvdG90eXBlLCB7IGNvbnN0cnVjdG9yOiB7IHZhbHVlOiBzdWJDbGFzcywgd3JpdGFibGU6IHRydWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSB9IH0pOyBpZiAoc3VwZXJDbGFzcykgX3NldFByb3RvdHlwZU9mKHN1YkNsYXNzLCBzdXBlckNsYXNzKTsgfVxuXG5mdW5jdGlvbiBfc2V0UHJvdG90eXBlT2YobywgcCkgeyBfc2V0UHJvdG90eXBlT2YgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHwgZnVuY3Rpb24gX3NldFByb3RvdHlwZU9mKG8sIHApIHsgby5fX3Byb3RvX18gPSBwOyByZXR1cm4gbzsgfTsgcmV0dXJuIF9zZXRQcm90b3R5cGVPZihvLCBwKTsgfVxuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgZ3JhZGVDb2x1bW5zXzEgPSByZXF1aXJlKFwiLi4vLi4vY29tbW9uL0JCQWJzdHJhY3RCYWNrZW5kL2dyYWRlQ29sdW1uc1wiKTtcblxudmFyIEJCR3JhZGVDb2x1bW5zID1cbi8qI19fUFVSRV9fKi9cbmZ1bmN0aW9uIChfZ3JhZGVDb2x1bW5zXzEkZGVmYXUpIHtcbiAgX2luaGVyaXRzKEJCR3JhZGVDb2x1bW5zLCBfZ3JhZGVDb2x1bW5zXzEkZGVmYXUpO1xuXG4gIGZ1bmN0aW9uIEJCR3JhZGVDb2x1bW5zKGNhdGVnb3J5LCBiYWNrZW5kKSB7XG4gICAgdmFyIF90aGlzO1xuXG4gICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIEJCR3JhZGVDb2x1bW5zKTtcblxuICAgIF90aGlzID0gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4odGhpcywgX2dldFByb3RvdHlwZU9mKEJCR3JhZGVDb2x1bW5zKS5jYWxsKHRoaXMpKTtcbiAgICBfdGhpcy5iYWNrZW5kID0gYmFja2VuZDtcbiAgICBfdGhpcy5jYXRlZ29yeSA9IGNhdGVnb3J5O1xuICAgIHJldHVybiBfdGhpcztcbiAgfVxuXG4gIF9jcmVhdGVDbGFzcyhCQkdyYWRlQ29sdW1ucywgW3tcbiAgICBrZXk6IFwiZ2V0QXNzaWdubWVudENvbFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBnZXRBc3NpZ25tZW50Q29sKHBhcmFtZXRlcnMpIHtcbiAgICAgIHJldHVybiB0aGlzLmJhY2tlbmQuc2VuZE1lc3NhZ2VUaHJvdWdoQ29ubmVjdGlvbk1hbmFnZXIodGhpcy5jYXRlZ29yeSwgXCJnZXRBc3NpZ25tZW50Q29sXCIsIHBhcmFtZXRlcnMpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJkZWxldGVBc3NpZ25tZW50Q29sXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGRlbGV0ZUFzc2lnbm1lbnRDb2wocGFyYW1ldGVycykge1xuICAgICAgcmV0dXJuIHRoaXMuYmFja2VuZC5zZW5kTWVzc2FnZVRocm91Z2hDb25uZWN0aW9uTWFuYWdlcih0aGlzLmNhdGVnb3J5LCBcImRlbGV0ZUFzc2lnbm1lbnRDb2xcIiwgcGFyYW1ldGVycyk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImNyZWF0ZUFzc2lnbm1lbnRBdHRlbXB0XCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGNyZWF0ZUFzc2lnbm1lbnRBdHRlbXB0KHBhcmFtZXRlcnMpIHtcbiAgICAgIHJldHVybiB0aGlzLmJhY2tlbmQuc2VuZE1lc3NhZ2VUaHJvdWdoQ29ubmVjdGlvbk1hbmFnZXIodGhpcy5jYXRlZ29yeSwgXCJjcmVhdGVBc3NpZ25tZW50QXR0ZW1wdFwiLCBwYXJhbWV0ZXJzKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwidXBkYXRlQXNzaWdubWVudEF0dGVtcHRcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gdXBkYXRlQXNzaWdubWVudEF0dGVtcHQocGFyYW1ldGVycykge1xuICAgICAgcmV0dXJuIHRoaXMuYmFja2VuZC5zZW5kTWVzc2FnZVRocm91Z2hDb25uZWN0aW9uTWFuYWdlcih0aGlzLmNhdGVnb3J5LCBcInVwZGF0ZUFzc2lnbm1lbnRBdHRlbXB0XCIsIHBhcmFtZXRlcnMpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJnZXRBc3NpZ25tZW50QXR0ZW1wdFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBnZXRBc3NpZ25tZW50QXR0ZW1wdChwYXJhbWV0ZXJzKSB7XG4gICAgICByZXR1cm4gdGhpcy5iYWNrZW5kLnNlbmRNZXNzYWdlVGhyb3VnaENvbm5lY3Rpb25NYW5hZ2VyKHRoaXMuY2F0ZWdvcnksIFwiZ2V0QXNzaWdubWVudEF0dGVtcHRcIiwgcGFyYW1ldGVycyk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImdldEFzc2lnbm1lbnRBdHRlbXB0c1wiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBnZXRBc3NpZ25tZW50QXR0ZW1wdHMocGFyYW1ldGVycykge1xuICAgICAgcmV0dXJuIHRoaXMuYmFja2VuZC5zZW5kTWVzc2FnZVRocm91Z2hDb25uZWN0aW9uTWFuYWdlcih0aGlzLmNhdGVnb3J5LCBcImdldEFzc2lnbm1lbnRBdHRlbXB0c1wiLCBwYXJhbWV0ZXJzKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiYWRkRmlsZVRvQXNzaWdubWVudEF0dGVtcHRcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gYWRkRmlsZVRvQXNzaWdubWVudEF0dGVtcHQocGFyYW1ldGVycykge1xuICAgICAgcmV0dXJuIHRoaXMuYmFja2VuZC5zZW5kTWVzc2FnZVRocm91Z2hDb25uZWN0aW9uTWFuYWdlcih0aGlzLmNhdGVnb3J5LCBcImFkZEZpbGVUb0Fzc2lnbm1lbnRBdHRlbXB0XCIsIHBhcmFtZXRlcnMpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJkZWxldGVGaWxlRnJvbUFzc2lnbm1lbnRBdHRlbXB0XCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGRlbGV0ZUZpbGVGcm9tQXNzaWdubWVudEF0dGVtcHQocGFyYW1ldGVycykge1xuICAgICAgcmV0dXJuIHRoaXMuYmFja2VuZC5zZW5kTWVzc2FnZVRocm91Z2hDb25uZWN0aW9uTWFuYWdlcih0aGlzLmNhdGVnb3J5LCBcImRlbGV0ZUZpbGVGcm9tQXNzaWdubWVudEF0dGVtcHRcIiwgcGFyYW1ldGVycyk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImRvd25sb2FkRmlsZUZyb21Bc3NpZ25tZW50QXR0ZW1wdFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBkb3dubG9hZEZpbGVGcm9tQXNzaWdubWVudEF0dGVtcHQocGFyYW1ldGVycykge1xuICAgICAgcmV0dXJuIHRoaXMuYmFja2VuZC5zZW5kTWVzc2FnZVRocm91Z2hDb25uZWN0aW9uTWFuYWdlcih0aGlzLmNhdGVnb3J5LCBcImRvd25sb2FkRmlsZUZyb21Bc3NpZ25tZW50QXR0ZW1wdFwiLCBwYXJhbWV0ZXJzKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiZ2V0RmlsZUZyb21Bc3NpZ25tZW50QXR0ZW1wdFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBnZXRGaWxlRnJvbUFzc2lnbm1lbnRBdHRlbXB0KHBhcmFtZXRlcnMpIHtcbiAgICAgIHJldHVybiB0aGlzLmJhY2tlbmQuc2VuZE1lc3NhZ2VUaHJvdWdoQ29ubmVjdGlvbk1hbmFnZXIodGhpcy5jYXRlZ29yeSwgXCJnZXRGaWxlRnJvbUFzc2lnbm1lbnRBdHRlbXB0XCIsIHBhcmFtZXRlcnMpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJnZXRGaWxlc0Zyb21Bc3NpZ25tZW50QXR0ZW1wdFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBnZXRGaWxlc0Zyb21Bc3NpZ25tZW50QXR0ZW1wdChwYXJhbWV0ZXJzKSB7XG4gICAgICByZXR1cm4gdGhpcy5iYWNrZW5kLnNlbmRNZXNzYWdlVGhyb3VnaENvbm5lY3Rpb25NYW5hZ2VyKHRoaXMuY2F0ZWdvcnksIFwiZ2V0RmlsZXNGcm9tQXNzaWdubWVudEF0dGVtcHRcIiwgcGFyYW1ldGVycyk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImdldFVzZXJHcmFkZXNcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gZ2V0VXNlckdyYWRlcyhwYXJhbWV0ZXJzKSB7XG4gICAgICByZXR1cm4gdGhpcy5iYWNrZW5kLnNlbmRNZXNzYWdlVGhyb3VnaENvbm5lY3Rpb25NYW5hZ2VyKHRoaXMuY2F0ZWdvcnksIFwiZ2V0VXNlckdyYWRlc1wiLCBwYXJhbWV0ZXJzKTtcbiAgICB9XG4gIH1dKTtcblxuICByZXR1cm4gQkJHcmFkZUNvbHVtbnM7XG59KGdyYWRlQ29sdW1uc18xW1wiZGVmYXVsdFwiXSk7XG5cbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gQkJHcmFkZUNvbHVtbnM7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmZ1bmN0aW9uIF90eXBlb2Yob2JqKSB7IGlmICh0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgdHlwZW9mIFN5bWJvbC5pdGVyYXRvciA9PT0gXCJzeW1ib2xcIikgeyBfdHlwZW9mID0gZnVuY3Rpb24gX3R5cGVvZihvYmopIHsgcmV0dXJuIHR5cGVvZiBvYmo7IH07IH0gZWxzZSB7IF90eXBlb2YgPSBmdW5jdGlvbiBfdHlwZW9mKG9iaikgeyByZXR1cm4gb2JqICYmIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvYmouY29uc3RydWN0b3IgPT09IFN5bWJvbCAmJiBvYmogIT09IFN5bWJvbC5wcm90b3R5cGUgPyBcInN5bWJvbFwiIDogdHlwZW9mIG9iajsgfTsgfSByZXR1cm4gX3R5cGVvZihvYmopOyB9XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5cbmZ1bmN0aW9uIF9kZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHsgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykgeyB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldOyBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7IGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTsgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpOyB9IH1cblxuZnVuY3Rpb24gX2NyZWF0ZUNsYXNzKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykgeyBpZiAocHJvdG9Qcm9wcykgX2RlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTsgaWYgKHN0YXRpY1Byb3BzKSBfZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpOyByZXR1cm4gQ29uc3RydWN0b3I7IH1cblxuZnVuY3Rpb24gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4oc2VsZiwgY2FsbCkgeyBpZiAoY2FsbCAmJiAoX3R5cGVvZihjYWxsKSA9PT0gXCJvYmplY3RcIiB8fCB0eXBlb2YgY2FsbCA9PT0gXCJmdW5jdGlvblwiKSkgeyByZXR1cm4gY2FsbDsgfSByZXR1cm4gX2Fzc2VydFRoaXNJbml0aWFsaXplZChzZWxmKTsgfVxuXG5mdW5jdGlvbiBfYXNzZXJ0VGhpc0luaXRpYWxpemVkKHNlbGYpIHsgaWYgKHNlbGYgPT09IHZvaWQgMCkgeyB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoXCJ0aGlzIGhhc24ndCBiZWVuIGluaXRpYWxpc2VkIC0gc3VwZXIoKSBoYXNuJ3QgYmVlbiBjYWxsZWRcIik7IH0gcmV0dXJuIHNlbGY7IH1cblxuZnVuY3Rpb24gX2dldFByb3RvdHlwZU9mKG8pIHsgX2dldFByb3RvdHlwZU9mID0gT2JqZWN0LnNldFByb3RvdHlwZU9mID8gT2JqZWN0LmdldFByb3RvdHlwZU9mIDogZnVuY3Rpb24gX2dldFByb3RvdHlwZU9mKG8pIHsgcmV0dXJuIG8uX19wcm90b19fIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihvKTsgfTsgcmV0dXJuIF9nZXRQcm90b3R5cGVPZihvKTsgfVxuXG5mdW5jdGlvbiBfaW5oZXJpdHMoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHsgaWYgKHR5cGVvZiBzdXBlckNsYXNzICE9PSBcImZ1bmN0aW9uXCIgJiYgc3VwZXJDbGFzcyAhPT0gbnVsbCkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3VwZXIgZXhwcmVzc2lvbiBtdXN0IGVpdGhlciBiZSBudWxsIG9yIGEgZnVuY3Rpb25cIik7IH0gc3ViQ2xhc3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzICYmIHN1cGVyQ2xhc3MucHJvdG90eXBlLCB7IGNvbnN0cnVjdG9yOiB7IHZhbHVlOiBzdWJDbGFzcywgd3JpdGFibGU6IHRydWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSB9IH0pOyBpZiAoc3VwZXJDbGFzcykgX3NldFByb3RvdHlwZU9mKHN1YkNsYXNzLCBzdXBlckNsYXNzKTsgfVxuXG5mdW5jdGlvbiBfc2V0UHJvdG90eXBlT2YobywgcCkgeyBfc2V0UHJvdG90eXBlT2YgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHwgZnVuY3Rpb24gX3NldFByb3RvdHlwZU9mKG8sIHApIHsgby5fX3Byb3RvX18gPSBwOyByZXR1cm4gbzsgfTsgcmV0dXJuIF9zZXRQcm90b3R5cGVPZihvLCBwKTsgfVxuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgZ3JvdXBzXzEgPSByZXF1aXJlKFwiLi4vLi4vY29tbW9uL0JCQWJzdHJhY3RCYWNrZW5kL2dyb3Vwc1wiKTtcblxudmFyIEJCR3JvdXBzID1cbi8qI19fUFVSRV9fKi9cbmZ1bmN0aW9uIChfZ3JvdXBzXzEkZGVmYXVsdCkge1xuICBfaW5oZXJpdHMoQkJHcm91cHMsIF9ncm91cHNfMSRkZWZhdWx0KTtcblxuICBmdW5jdGlvbiBCQkdyb3VwcyhjYXRlZ29yeSwgYmFja2VuZCkge1xuICAgIHZhciBfdGhpcztcblxuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBCQkdyb3Vwcyk7XG5cbiAgICBfdGhpcyA9IF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHRoaXMsIF9nZXRQcm90b3R5cGVPZihCQkdyb3VwcykuY2FsbCh0aGlzKSk7XG4gICAgX3RoaXMuYmFja2VuZCA9IGJhY2tlbmQ7XG4gICAgX3RoaXMuY2F0ZWdvcnkgPSBjYXRlZ29yeTtcbiAgICByZXR1cm4gX3RoaXM7XG4gIH1cblxuICBfY3JlYXRlQ2xhc3MoQkJHcm91cHMsIFt7XG4gICAga2V5OiBcImdldEdyb3Vwc1wiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBnZXRHcm91cHMocGFyYW1ldGVycykge1xuICAgICAgcmV0dXJuIHRoaXMuYmFja2VuZC5zZW5kTWVzc2FnZVRocm91Z2hDb25uZWN0aW9uTWFuYWdlcih0aGlzLmNhdGVnb3J5LCBcImdldEdyb3Vwc1wiLCBwYXJhbWV0ZXJzKTtcbiAgICB9XG4gIH1dKTtcblxuICByZXR1cm4gQkJHcm91cHM7XG59KGdyb3Vwc18xW1wiZGVmYXVsdFwiXSk7XG5cbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gQkJHcm91cHM7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmZ1bmN0aW9uIF90eXBlb2Yob2JqKSB7IGlmICh0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgdHlwZW9mIFN5bWJvbC5pdGVyYXRvciA9PT0gXCJzeW1ib2xcIikgeyBfdHlwZW9mID0gZnVuY3Rpb24gX3R5cGVvZihvYmopIHsgcmV0dXJuIHR5cGVvZiBvYmo7IH07IH0gZWxzZSB7IF90eXBlb2YgPSBmdW5jdGlvbiBfdHlwZW9mKG9iaikgeyByZXR1cm4gb2JqICYmIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvYmouY29uc3RydWN0b3IgPT09IFN5bWJvbCAmJiBvYmogIT09IFN5bWJvbC5wcm90b3R5cGUgPyBcInN5bWJvbFwiIDogdHlwZW9mIG9iajsgfTsgfSByZXR1cm4gX3R5cGVvZihvYmopOyB9XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5cbmZ1bmN0aW9uIF9kZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHsgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykgeyB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldOyBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7IGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTsgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpOyB9IH1cblxuZnVuY3Rpb24gX2NyZWF0ZUNsYXNzKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykgeyBpZiAocHJvdG9Qcm9wcykgX2RlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTsgaWYgKHN0YXRpY1Byb3BzKSBfZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpOyByZXR1cm4gQ29uc3RydWN0b3I7IH1cblxuZnVuY3Rpb24gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4oc2VsZiwgY2FsbCkgeyBpZiAoY2FsbCAmJiAoX3R5cGVvZihjYWxsKSA9PT0gXCJvYmplY3RcIiB8fCB0eXBlb2YgY2FsbCA9PT0gXCJmdW5jdGlvblwiKSkgeyByZXR1cm4gY2FsbDsgfSByZXR1cm4gX2Fzc2VydFRoaXNJbml0aWFsaXplZChzZWxmKTsgfVxuXG5mdW5jdGlvbiBfYXNzZXJ0VGhpc0luaXRpYWxpemVkKHNlbGYpIHsgaWYgKHNlbGYgPT09IHZvaWQgMCkgeyB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoXCJ0aGlzIGhhc24ndCBiZWVuIGluaXRpYWxpc2VkIC0gc3VwZXIoKSBoYXNuJ3QgYmVlbiBjYWxsZWRcIik7IH0gcmV0dXJuIHNlbGY7IH1cblxuZnVuY3Rpb24gX2dldFByb3RvdHlwZU9mKG8pIHsgX2dldFByb3RvdHlwZU9mID0gT2JqZWN0LnNldFByb3RvdHlwZU9mID8gT2JqZWN0LmdldFByb3RvdHlwZU9mIDogZnVuY3Rpb24gX2dldFByb3RvdHlwZU9mKG8pIHsgcmV0dXJuIG8uX19wcm90b19fIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihvKTsgfTsgcmV0dXJuIF9nZXRQcm90b3R5cGVPZihvKTsgfVxuXG5mdW5jdGlvbiBfaW5oZXJpdHMoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHsgaWYgKHR5cGVvZiBzdXBlckNsYXNzICE9PSBcImZ1bmN0aW9uXCIgJiYgc3VwZXJDbGFzcyAhPT0gbnVsbCkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3VwZXIgZXhwcmVzc2lvbiBtdXN0IGVpdGhlciBiZSBudWxsIG9yIGEgZnVuY3Rpb25cIik7IH0gc3ViQ2xhc3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzICYmIHN1cGVyQ2xhc3MucHJvdG90eXBlLCB7IGNvbnN0cnVjdG9yOiB7IHZhbHVlOiBzdWJDbGFzcywgd3JpdGFibGU6IHRydWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSB9IH0pOyBpZiAoc3VwZXJDbGFzcykgX3NldFByb3RvdHlwZU9mKHN1YkNsYXNzLCBzdXBlckNsYXNzKTsgfVxuXG5mdW5jdGlvbiBfc2V0UHJvdG90eXBlT2YobywgcCkgeyBfc2V0UHJvdG90eXBlT2YgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHwgZnVuY3Rpb24gX3NldFByb3RvdHlwZU9mKG8sIHApIHsgby5fX3Byb3RvX18gPSBwOyByZXR1cm4gbzsgfTsgcmV0dXJuIF9zZXRQcm90b3R5cGVPZihvLCBwKTsgfVxuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgbWlzY18xID0gcmVxdWlyZShcIi4uLy4uL2NvbW1vbi9CQkFic3RyYWN0QmFja2VuZC9taXNjXCIpO1xuXG52YXIgQkJNaXNjID1cbi8qI19fUFVSRV9fKi9cbmZ1bmN0aW9uIChfbWlzY18xJGRlZmF1bHQpIHtcbiAgX2luaGVyaXRzKEJCTWlzYywgX21pc2NfMSRkZWZhdWx0KTtcblxuICBmdW5jdGlvbiBCQk1pc2MoY2F0ZWdvcnksIGJhY2tlbmQpIHtcbiAgICB2YXIgX3RoaXM7XG5cbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgQkJNaXNjKTtcblxuICAgIF90aGlzID0gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4odGhpcywgX2dldFByb3RvdHlwZU9mKEJCTWlzYykuY2FsbCh0aGlzKSk7XG4gICAgX3RoaXMuYmFja2VuZCA9IGJhY2tlbmQ7XG4gICAgX3RoaXMuY2F0ZWdvcnkgPSBjYXRlZ29yeTtcbiAgICByZXR1cm4gX3RoaXM7XG4gIH1cblxuICBfY3JlYXRlQ2xhc3MoQkJNaXNjLCBbe1xuICAgIGtleTogXCJnZXRCbGFja2JvYXJkRG9tYWluXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGdldEJsYWNrYm9hcmREb21haW4oKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJNZXRob2Qgbm90IGltcGxlbWVudGVkLlwiKTtcbiAgICB9XG4gIH1dKTtcblxuICByZXR1cm4gQkJNaXNjO1xufShtaXNjXzFbXCJkZWZhdWx0XCJdKTtcblxuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBCQk1pc2M7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmZ1bmN0aW9uIF90eXBlb2Yob2JqKSB7IGlmICh0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgdHlwZW9mIFN5bWJvbC5pdGVyYXRvciA9PT0gXCJzeW1ib2xcIikgeyBfdHlwZW9mID0gZnVuY3Rpb24gX3R5cGVvZihvYmopIHsgcmV0dXJuIHR5cGVvZiBvYmo7IH07IH0gZWxzZSB7IF90eXBlb2YgPSBmdW5jdGlvbiBfdHlwZW9mKG9iaikgeyByZXR1cm4gb2JqICYmIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvYmouY29uc3RydWN0b3IgPT09IFN5bWJvbCAmJiBvYmogIT09IFN5bWJvbC5wcm90b3R5cGUgPyBcInN5bWJvbFwiIDogdHlwZW9mIG9iajsgfTsgfSByZXR1cm4gX3R5cGVvZihvYmopOyB9XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5cbmZ1bmN0aW9uIF9kZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHsgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykgeyB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldOyBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7IGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTsgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpOyB9IH1cblxuZnVuY3Rpb24gX2NyZWF0ZUNsYXNzKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykgeyBpZiAocHJvdG9Qcm9wcykgX2RlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTsgaWYgKHN0YXRpY1Byb3BzKSBfZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpOyByZXR1cm4gQ29uc3RydWN0b3I7IH1cblxuZnVuY3Rpb24gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4oc2VsZiwgY2FsbCkgeyBpZiAoY2FsbCAmJiAoX3R5cGVvZihjYWxsKSA9PT0gXCJvYmplY3RcIiB8fCB0eXBlb2YgY2FsbCA9PT0gXCJmdW5jdGlvblwiKSkgeyByZXR1cm4gY2FsbDsgfSByZXR1cm4gX2Fzc2VydFRoaXNJbml0aWFsaXplZChzZWxmKTsgfVxuXG5mdW5jdGlvbiBfYXNzZXJ0VGhpc0luaXRpYWxpemVkKHNlbGYpIHsgaWYgKHNlbGYgPT09IHZvaWQgMCkgeyB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoXCJ0aGlzIGhhc24ndCBiZWVuIGluaXRpYWxpc2VkIC0gc3VwZXIoKSBoYXNuJ3QgYmVlbiBjYWxsZWRcIik7IH0gcmV0dXJuIHNlbGY7IH1cblxuZnVuY3Rpb24gX2dldFByb3RvdHlwZU9mKG8pIHsgX2dldFByb3RvdHlwZU9mID0gT2JqZWN0LnNldFByb3RvdHlwZU9mID8gT2JqZWN0LmdldFByb3RvdHlwZU9mIDogZnVuY3Rpb24gX2dldFByb3RvdHlwZU9mKG8pIHsgcmV0dXJuIG8uX19wcm90b19fIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihvKTsgfTsgcmV0dXJuIF9nZXRQcm90b3R5cGVPZihvKTsgfVxuXG5mdW5jdGlvbiBfaW5oZXJpdHMoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHsgaWYgKHR5cGVvZiBzdXBlckNsYXNzICE9PSBcImZ1bmN0aW9uXCIgJiYgc3VwZXJDbGFzcyAhPT0gbnVsbCkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3VwZXIgZXhwcmVzc2lvbiBtdXN0IGVpdGhlciBiZSBudWxsIG9yIGEgZnVuY3Rpb25cIik7IH0gc3ViQ2xhc3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzICYmIHN1cGVyQ2xhc3MucHJvdG90eXBlLCB7IGNvbnN0cnVjdG9yOiB7IHZhbHVlOiBzdWJDbGFzcywgd3JpdGFibGU6IHRydWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSB9IH0pOyBpZiAoc3VwZXJDbGFzcykgX3NldFByb3RvdHlwZU9mKHN1YkNsYXNzLCBzdXBlckNsYXNzKTsgfVxuXG5mdW5jdGlvbiBfc2V0UHJvdG90eXBlT2YobywgcCkgeyBfc2V0UHJvdG90eXBlT2YgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHwgZnVuY3Rpb24gX3NldFByb3RvdHlwZU9mKG8sIHApIHsgby5fX3Byb3RvX18gPSBwOyByZXR1cm4gbzsgfTsgcmV0dXJuIF9zZXRQcm90b3R5cGVPZihvLCBwKTsgfVxuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgdXNlcnNfMSA9IHJlcXVpcmUoXCIuLi8uLi9jb21tb24vQkJBYnN0cmFjdEJhY2tlbmQvdXNlcnNcIik7XG5cbnZhciBCQlVzZXJzID1cbi8qI19fUFVSRV9fKi9cbmZ1bmN0aW9uIChfdXNlcnNfMSRkZWZhdWx0KSB7XG4gIF9pbmhlcml0cyhCQlVzZXJzLCBfdXNlcnNfMSRkZWZhdWx0KTtcblxuICBmdW5jdGlvbiBCQlVzZXJzKGNhdGVnb3J5LCBiYWNrZW5kKSB7XG4gICAgdmFyIF90aGlzO1xuXG4gICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIEJCVXNlcnMpO1xuXG4gICAgX3RoaXMgPSBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybih0aGlzLCBfZ2V0UHJvdG90eXBlT2YoQkJVc2VycykuY2FsbCh0aGlzKSk7XG4gICAgX3RoaXMuYmFja2VuZCA9IGJhY2tlbmQ7XG4gICAgX3RoaXMuY2F0ZWdvcnkgPSBjYXRlZ29yeTtcbiAgICByZXR1cm4gX3RoaXM7XG4gIH1cblxuICBfY3JlYXRlQ2xhc3MoQkJVc2VycywgW3tcbiAgICBrZXk6IFwiZ2V0VXNlckluZm9cIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gZ2V0VXNlckluZm8ocGFyYW1ldGVycykge1xuICAgICAgcmV0dXJuIHRoaXMuYmFja2VuZC5zZW5kTWVzc2FnZVRocm91Z2hDb25uZWN0aW9uTWFuYWdlcih0aGlzLmNhdGVnb3J5LCBcImdldFVzZXJJbmZvXCIsIHBhcmFtZXRlcnMpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJnZXRDdXJyZW50VXNlcklkXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGdldEN1cnJlbnRVc2VySWQocGFyYW1ldGVycykge1xuICAgICAgcmV0dXJuIHRoaXMuYmFja2VuZC5zZW5kTWVzc2FnZVRocm91Z2hDb25uZWN0aW9uTWFuYWdlcih0aGlzLmNhdGVnb3J5LCBcImdldEN1cnJlbnRVc2VySWRcIiwgcGFyYW1ldGVycyk7XG4gICAgfVxuICB9XSk7XG5cbiAgcmV0dXJuIEJCVXNlcnM7XG59KHVzZXJzXzFbXCJkZWZhdWx0XCJdKTtcblxuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBCQlVzZXJzOyIsIlwidXNlIHN0cmljdFwiO1xuXG5mdW5jdGlvbiBfdHlwZW9mKG9iaikgeyBpZiAodHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgPT09IFwic3ltYm9sXCIpIHsgX3R5cGVvZiA9IGZ1bmN0aW9uIF90eXBlb2Yob2JqKSB7IHJldHVybiB0eXBlb2Ygb2JqOyB9OyB9IGVsc2UgeyBfdHlwZW9mID0gZnVuY3Rpb24gX3R5cGVvZihvYmopIHsgcmV0dXJuIG9iaiAmJiB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb2JqLmNvbnN0cnVjdG9yID09PSBTeW1ib2wgJiYgb2JqICE9PSBTeW1ib2wucHJvdG90eXBlID8gXCJzeW1ib2xcIiA6IHR5cGVvZiBvYmo7IH07IH0gcmV0dXJuIF90eXBlb2Yob2JqKTsgfVxuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG5mdW5jdGlvbiBfZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7IGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHsgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTsgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlOyBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7IGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTsgfSB9XG5cbmZ1bmN0aW9uIF9jcmVhdGVDbGFzcyhDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHsgaWYgKHByb3RvUHJvcHMpIF9kZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7IGlmIChzdGF0aWNQcm9wcykgX2RlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTsgcmV0dXJuIENvbnN0cnVjdG9yOyB9XG5cbmZ1bmN0aW9uIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHNlbGYsIGNhbGwpIHsgaWYgKGNhbGwgJiYgKF90eXBlb2YoY2FsbCkgPT09IFwib2JqZWN0XCIgfHwgdHlwZW9mIGNhbGwgPT09IFwiZnVuY3Rpb25cIikpIHsgcmV0dXJuIGNhbGw7IH0gcmV0dXJuIF9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQoc2VsZik7IH1cblxuZnVuY3Rpb24gX2dldFByb3RvdHlwZU9mKG8pIHsgX2dldFByb3RvdHlwZU9mID0gT2JqZWN0LnNldFByb3RvdHlwZU9mID8gT2JqZWN0LmdldFByb3RvdHlwZU9mIDogZnVuY3Rpb24gX2dldFByb3RvdHlwZU9mKG8pIHsgcmV0dXJuIG8uX19wcm90b19fIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihvKTsgfTsgcmV0dXJuIF9nZXRQcm90b3R5cGVPZihvKTsgfVxuXG5mdW5jdGlvbiBfYXNzZXJ0VGhpc0luaXRpYWxpemVkKHNlbGYpIHsgaWYgKHNlbGYgPT09IHZvaWQgMCkgeyB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoXCJ0aGlzIGhhc24ndCBiZWVuIGluaXRpYWxpc2VkIC0gc3VwZXIoKSBoYXNuJ3QgYmVlbiBjYWxsZWRcIik7IH0gcmV0dXJuIHNlbGY7IH1cblxuZnVuY3Rpb24gX2luaGVyaXRzKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7IGlmICh0eXBlb2Ygc3VwZXJDbGFzcyAhPT0gXCJmdW5jdGlvblwiICYmIHN1cGVyQ2xhc3MgIT09IG51bGwpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN1cGVyIGV4cHJlc3Npb24gbXVzdCBlaXRoZXIgYmUgbnVsbCBvciBhIGZ1bmN0aW9uXCIpOyB9IHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcyAmJiBzdXBlckNsYXNzLnByb3RvdHlwZSwgeyBjb25zdHJ1Y3RvcjogeyB2YWx1ZTogc3ViQ2xhc3MsIHdyaXRhYmxlOiB0cnVlLCBjb25maWd1cmFibGU6IHRydWUgfSB9KTsgaWYgKHN1cGVyQ2xhc3MpIF9zZXRQcm90b3R5cGVPZihzdWJDbGFzcywgc3VwZXJDbGFzcyk7IH1cblxuZnVuY3Rpb24gX3NldFByb3RvdHlwZU9mKG8sIHApIHsgX3NldFByb3RvdHlwZU9mID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8IGZ1bmN0aW9uIF9zZXRQcm90b3R5cGVPZihvLCBwKSB7IG8uX19wcm90b19fID0gcDsgcmV0dXJuIG87IH07IHJldHVybiBfc2V0UHJvdG90eXBlT2YobywgcCk7IH1cblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIGNvbW1vbl8xID0gcmVxdWlyZShcIi4uLy4uL2NvbW1vblwiKTtcblxudmFyIEJCQ291cnNlc18xID0gcmVxdWlyZShcIi4vQkJDb3Vyc2VzXCIpO1xuXG52YXIgQkJFbWFpbHNfMSA9IHJlcXVpcmUoXCIuL0JCRW1haWxzXCIpO1xuXG52YXIgQkJGaWxlc18xID0gcmVxdWlyZShcIi4vQkJGaWxlc1wiKTtcblxudmFyIEJCR3JhZGVDb2x1bW5zXzEgPSByZXF1aXJlKFwiLi9CQkdyYWRlQ29sdW1uc1wiKTtcblxudmFyIEJCR3JvdXBzXzEgPSByZXF1aXJlKFwiLi9CQkdyb3Vwc1wiKTtcblxudmFyIEJCTWlzY18xID0gcmVxdWlyZShcIi4vQkJNaXNjXCIpO1xuXG52YXIgQkJVc2Vyc18xID0gcmVxdWlyZShcIi4vQkJVc2Vyc1wiKTtcblxudmFyIEJCSWZyYW1lQmFja2VuZCA9XG4vKiNfX1BVUkVfXyovXG5mdW5jdGlvbiAoX2NvbW1vbl8xJEJCQWJzdHJhY3RCKSB7XG4gIF9pbmhlcml0cyhCQklmcmFtZUJhY2tlbmQsIF9jb21tb25fMSRCQkFic3RyYWN0Qik7XG5cbiAgZnVuY3Rpb24gQkJJZnJhbWVCYWNrZW5kKGNvbm5lY3Rpb25NYW5hZ2VyKSB7XG4gICAgdmFyIF90aGlzO1xuXG4gICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIEJCSWZyYW1lQmFja2VuZCk7XG5cbiAgICBfdGhpcyA9IF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHRoaXMsIF9nZXRQcm90b3R5cGVPZihCQklmcmFtZUJhY2tlbmQpLmNhbGwodGhpcykpO1xuICAgIF90aGlzLmNvdXJzZXMgPSBuZXcgQkJDb3Vyc2VzXzFbXCJkZWZhdWx0XCJdKCdjb3Vyc2VzJywgX2Fzc2VydFRoaXNJbml0aWFsaXplZChfdGhpcykpO1xuICAgIF90aGlzLmVtYWlsID0gbmV3IEJCRW1haWxzXzFbXCJkZWZhdWx0XCJdKCdlbWFpbCcsIF9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQoX3RoaXMpKTtcbiAgICBfdGhpcy5maWxlcyA9IG5ldyBCQkZpbGVzXzFbXCJkZWZhdWx0XCJdKCdmaWxlcycsIF9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQoX3RoaXMpKTtcbiAgICBfdGhpcy5ncmFkZUNvbHVtbnMgPSBuZXcgQkJHcmFkZUNvbHVtbnNfMVtcImRlZmF1bHRcIl0oJ2dyYWRlQ29sdW1ucycsIF9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQoX3RoaXMpKTtcbiAgICBfdGhpcy5ncm91cHMgPSBuZXcgQkJHcm91cHNfMVtcImRlZmF1bHRcIl0oJ2dyb3VwcycsIF9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQoX3RoaXMpKTtcbiAgICBfdGhpcy5taXNjID0gbmV3IEJCTWlzY18xW1wiZGVmYXVsdFwiXSgnbWlzYycsIF9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQoX3RoaXMpKTtcbiAgICBfdGhpcy51c2VycyA9IG5ldyBCQlVzZXJzXzFbXCJkZWZhdWx0XCJdKCd1c2VycycsIF9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQoX3RoaXMpKTtcblxuICAgIGlmICghX3RoaXMuY2hlY2tJZkluc2lkZUlmcmFtZSgpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJCQklmcmFtZUJhY2tlbmQgbm90IGxvYWRlZCBpbnNpZGUgSWZyYW1lXCIpO1xuICAgIH1cblxuICAgIGlmICghY29ubmVjdGlvbk1hbmFnZXIpIHtcbiAgICAgIGNvbm5lY3Rpb25NYW5hZ2VyID0gbmV3IGNvbW1vbl8xLldpbmRvd0Nvbm5lY3Rpb25NYW5hZ2VyKHdpbmRvdy5wYXJlbnQpO1xuICAgIH1cblxuICAgIF90aGlzLmNvbm5lY3Rpb25NYW5hZ2VyID0gY29ubmVjdGlvbk1hbmFnZXI7XG4gICAgcmV0dXJuIF90aGlzO1xuICB9XG5cbiAgX2NyZWF0ZUNsYXNzKEJCSWZyYW1lQmFja2VuZCwgW3tcbiAgICBrZXk6IFwiY2hlY2tJZkluc2lkZUlmcmFtZVwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBjaGVja0lmSW5zaWRlSWZyYW1lKCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgcmV0dXJuIHdpbmRvdy5zZWxmICE9PSB3aW5kb3cudG9wO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwic2VuZE1lc3NhZ2VUaHJvdWdoQ29ubmVjdGlvbk1hbmFnZXJcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gc2VuZE1lc3NhZ2VUaHJvdWdoQ29ubmVjdGlvbk1hbmFnZXIoY2F0ZWdvcnksIG1ldGhvZFNpZ25hdHVyZSkge1xuICAgICAgdmFyIF90aGlzMiA9IHRoaXM7XG5cbiAgICAgIHZhciBwYXJhbWV0ZXJzID0gYXJndW1lbnRzLmxlbmd0aCA+IDIgJiYgYXJndW1lbnRzWzJdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMl0gOiBudWxsO1xuICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgX3RoaXMyLmNvbm5lY3Rpb25NYW5hZ2VyLnNlbmRNZXNzYWdlKG5ldyBjb21tb25fMS5XaW5kb3dGdW5jdGlvbkNhbGwoY2F0ZWdvcnksIG1ldGhvZFNpZ25hdHVyZSwgcGFyYW1ldGVycyksIGZ1bmN0aW9uIChyZXR1cm5PYmplY3QpIHtcbiAgICAgICAgICByZXNvbHZlKHJldHVybk9iamVjdCk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfVxuICB9XSk7XG5cbiAgcmV0dXJuIEJCSWZyYW1lQmFja2VuZDtcbn0oY29tbW9uXzEuQkJBYnN0cmFjdEJhY2tlbmQpO1xuXG5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IEJCSWZyYW1lQmFja2VuZDsiLCJcInVzZSBzdHJpY3RcIjtcblxuZnVuY3Rpb24gX3R5cGVvZihvYmopIHsgaWYgKHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiB0eXBlb2YgU3ltYm9sLml0ZXJhdG9yID09PSBcInN5bWJvbFwiKSB7IF90eXBlb2YgPSBmdW5jdGlvbiBfdHlwZW9mKG9iaikgeyByZXR1cm4gdHlwZW9mIG9iajsgfTsgfSBlbHNlIHsgX3R5cGVvZiA9IGZ1bmN0aW9uIF90eXBlb2Yob2JqKSB7IHJldHVybiBvYmogJiYgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9iai5jb25zdHJ1Y3RvciA9PT0gU3ltYm9sICYmIG9iaiAhPT0gU3ltYm9sLnByb3RvdHlwZSA/IFwic3ltYm9sXCIgOiB0eXBlb2Ygb2JqOyB9OyB9IHJldHVybiBfdHlwZW9mKG9iaik7IH1cblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxuZnVuY3Rpb24gX2RlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7IHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07IGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTsgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlOyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7IH0gfVxuXG5mdW5jdGlvbiBfY3JlYXRlQ2xhc3MoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7IGlmIChwcm90b1Byb3BzKSBfZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpOyBpZiAoc3RhdGljUHJvcHMpIF9kZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7IHJldHVybiBDb25zdHJ1Y3RvcjsgfVxuXG5mdW5jdGlvbiBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybihzZWxmLCBjYWxsKSB7IGlmIChjYWxsICYmIChfdHlwZW9mKGNhbGwpID09PSBcIm9iamVjdFwiIHx8IHR5cGVvZiBjYWxsID09PSBcImZ1bmN0aW9uXCIpKSB7IHJldHVybiBjYWxsOyB9IHJldHVybiBfYXNzZXJ0VGhpc0luaXRpYWxpemVkKHNlbGYpOyB9XG5cbmZ1bmN0aW9uIF9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQoc2VsZikgeyBpZiAoc2VsZiA9PT0gdm9pZCAwKSB7IHRocm93IG5ldyBSZWZlcmVuY2VFcnJvcihcInRoaXMgaGFzbid0IGJlZW4gaW5pdGlhbGlzZWQgLSBzdXBlcigpIGhhc24ndCBiZWVuIGNhbGxlZFwiKTsgfSByZXR1cm4gc2VsZjsgfVxuXG5mdW5jdGlvbiBfZ2V0UHJvdG90eXBlT2YobykgeyBfZ2V0UHJvdG90eXBlT2YgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgPyBPYmplY3QuZ2V0UHJvdG90eXBlT2YgOiBmdW5jdGlvbiBfZ2V0UHJvdG90eXBlT2YobykgeyByZXR1cm4gby5fX3Byb3RvX18gfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKG8pOyB9OyByZXR1cm4gX2dldFByb3RvdHlwZU9mKG8pOyB9XG5cbmZ1bmN0aW9uIF9pbmhlcml0cyhzdWJDbGFzcywgc3VwZXJDbGFzcykgeyBpZiAodHlwZW9mIHN1cGVyQ2xhc3MgIT09IFwiZnVuY3Rpb25cIiAmJiBzdXBlckNsYXNzICE9PSBudWxsKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJTdXBlciBleHByZXNzaW9uIG11c3QgZWl0aGVyIGJlIG51bGwgb3IgYSBmdW5jdGlvblwiKTsgfSBzdWJDbGFzcy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MgJiYgc3VwZXJDbGFzcy5wcm90b3R5cGUsIHsgY29uc3RydWN0b3I6IHsgdmFsdWU6IHN1YkNsYXNzLCB3cml0YWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlIH0gfSk7IGlmIChzdXBlckNsYXNzKSBfc2V0UHJvdG90eXBlT2Yoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpOyB9XG5cbmZ1bmN0aW9uIF9zZXRQcm90b3R5cGVPZihvLCBwKSB7IF9zZXRQcm90b3R5cGVPZiA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fCBmdW5jdGlvbiBfc2V0UHJvdG90eXBlT2YobywgcCkgeyBvLl9fcHJvdG9fXyA9IHA7IHJldHVybiBvOyB9OyByZXR1cm4gX3NldFByb3RvdHlwZU9mKG8sIHApOyB9XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBjb21tb25fMSA9IHJlcXVpcmUoXCIuLi8uLi9jb21tb25cIik7XG5cbnZhciBjb3Vyc2VzXzEgPSByZXF1aXJlKFwiLi4vLi4vY29tbW9uL0JCQWJzdHJhY3RCYWNrZW5kL2NvdXJzZXNcIik7XG5cbnZhciBCQkNvdXJzZXMgPVxuLyojX19QVVJFX18qL1xuZnVuY3Rpb24gKF9jb3Vyc2VzXzEkZGVmYXVsdCkge1xuICBfaW5oZXJpdHMoQkJDb3Vyc2VzLCBfY291cnNlc18xJGRlZmF1bHQpO1xuXG4gIGZ1bmN0aW9uIEJCQ291cnNlcygpIHtcbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgQkJDb3Vyc2VzKTtcblxuICAgIHJldHVybiBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybih0aGlzLCBfZ2V0UHJvdG90eXBlT2YoQkJDb3Vyc2VzKS5hcHBseSh0aGlzLCBhcmd1bWVudHMpKTtcbiAgfVxuXG4gIF9jcmVhdGVDbGFzcyhCQkNvdXJzZXMsIFt7XG4gICAga2V5OiBcImdldEVucm9sbGVkQ291cnNlc1wiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBnZXRFbnJvbGxlZENvdXJzZXMocGFyYW1ldGVycykge1xuICAgICAgdmFyIHBhdGggPSBcIi9sZWFybi9hcGkvcHVibGljL3YxL3VzZXJzL1wiICsgcGFyYW1ldGVycy51c2VySWQgKyBcIi9jb3Vyc2VzP29mZnNldD1cIiArIHBhcmFtZXRlcnMub2Zmc2V0O1xuICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgY29tbW9uXzEuSFRUUFJlcXVlc3QuZ2V0QXN5bmMocGF0aCkudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICB2YXIgYWxsQ291cnNlSW5mb3JtYXRpb24gPSBKU09OLnBhcnNlKHJlc3BvbnNlKTtcbiAgICAgICAgICB2YXIgcmVzcG9uc2VJbmZvID0gbmV3IEFycmF5KCk7XG4gICAgICAgICAgYWxsQ291cnNlSW5mb3JtYXRpb24ucmVzdWx0cy5mb3JFYWNoKGZ1bmN0aW9uIChyZXN1bHQpIHtcbiAgICAgICAgICAgIHZhciByZXN1bHRPYmplY3QgPSB7XG4gICAgICAgICAgICAgIGlkOiByZXN1bHQuY291cnNlSWRcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICByZXNwb25zZUluZm8ucHVzaChyZXN1bHRPYmplY3QpO1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIHJlc29sdmUocmVzcG9uc2VJbmZvKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiZ2V0Q291cnNlSW5mb3JtYXRpb25cIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gZ2V0Q291cnNlSW5mb3JtYXRpb24ocGFyYW1ldGVycykge1xuICAgICAgdmFyIHBhdGggPSBcIi9sZWFybi9hcGkvcHVibGljL3YxL2NvdXJzZXMvXCIgKyBwYXJhbWV0ZXJzLmNvdXJzZUlkO1xuICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgY29tbW9uXzEuSFRUUFJlcXVlc3QuZ2V0QXN5bmMocGF0aCkudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICB2YXIgY291cnNlSW5mb3JtYXRpb24gPSBKU09OLnBhcnNlKHJlc3BvbnNlKTtcbiAgICAgICAgICB2YXIgcmVzdWx0T2JqZWN0ID0ge1xuICAgICAgICAgICAgaWQ6IGNvdXJzZUluZm9ybWF0aW9uLmlkLFxuICAgICAgICAgICAgdXVpZDogY291cnNlSW5mb3JtYXRpb24udXVpZCxcbiAgICAgICAgICAgIGV4dGVybmFsSWQ6IGNvdXJzZUluZm9ybWF0aW9uLmV4dGVybmFsSWQsXG4gICAgICAgICAgICBkYXRhU291cmNlSWQ6IGNvdXJzZUluZm9ybWF0aW9uLmRhdGFTb3VyY2VJZCxcbiAgICAgICAgICAgIGNvdXJzZUlkOiBjb3Vyc2VJbmZvcm1hdGlvbi5jb3Vyc2VJZCxcbiAgICAgICAgICAgIG5hbWU6IGNvdXJzZUluZm9ybWF0aW9uLm5hbWUsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogY291cnNlSW5mb3JtYXRpb24uZGVzY3JpcHRpb24sXG4gICAgICAgICAgICBjcmVhdGVkOiBjb3Vyc2VJbmZvcm1hdGlvbi5jcmVhdGVkLFxuICAgICAgICAgICAgb3JnYW5pemF0aW9uOiBjb3Vyc2VJbmZvcm1hdGlvbi5vcmdhbml6YXRpb24sXG4gICAgICAgICAgICB1bHRyYVN0YXR1czogY291cnNlSW5mb3JtYXRpb24udWx0cmFTdGF0dXMsXG4gICAgICAgICAgICBhY2Nlc3NDb2RlOiBjb3Vyc2VJbmZvcm1hdGlvbi5lbnJvbGxtZW50LmFjY2Vzc0NvZGUsXG4gICAgICAgICAgICBhbGxvd0d1ZXN0czogY291cnNlSW5mb3JtYXRpb24uYWxsb3dHdWVzdHMsXG4gICAgICAgICAgICBhdmFpbGFibGU6IGNvdXJzZUluZm9ybWF0aW9uLmF2YWlsYWJpbGl0eS5hdmFpbGFibGUsXG4gICAgICAgICAgICBkdXJhdGlvbjogY291cnNlSW5mb3JtYXRpb24uYXZhaWxhYmlsaXR5LmR1cmF0aW9uLnR5cGUsXG4gICAgICAgICAgICBlbnJvbGxtZW50OiBjb3Vyc2VJbmZvcm1hdGlvbi5lbnJvbGxtZW50LnR5cGUsXG4gICAgICAgICAgICBoYXNDaGlsZHJlbjogY291cnNlSW5mb3JtYXRpb24uaGFzQ2hpbGRyZW4sXG4gICAgICAgICAgICBwYXJlbnRJZDogY291cnNlSW5mb3JtYXRpb24ucGFyZW50SWQsXG4gICAgICAgICAgICBsb2NhbGU6IGNvdXJzZUluZm9ybWF0aW9uLmxvY2FsZS5mb3JjZSxcbiAgICAgICAgICAgIHJlYWRPbmx5OiBjb3Vyc2VJbmZvcm1hdGlvbi5yZWFkT25seVxuICAgICAgICAgIH07XG4gICAgICAgICAgcmVzb2x2ZShyZXN1bHRPYmplY3QpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJwb3N0Q291cnNlXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHBvc3RDb3Vyc2UoKSB7XG4gICAgICB2YXIgcGF0aCA9IFwiL2xlYXJuL2FwaS9wdWJsaWMvdjEvY291cnNlcy9cIjtcbiAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGNvbW1vbl8xLkhUVFBSZXF1ZXN0LnBvc3RBc3luYyhwYXRoLCBudWxsKS50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgIHJlc29sdmUocmVzcG9uc2UpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJkZWxldGVDb3Vyc2VcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gZGVsZXRlQ291cnNlKHBhcmFtZXRlcnMpIHtcbiAgICAgIHZhciBwYXRoID0gXCIvbGVhcm4vYXBpL3B1YmxpYy92MS9jb3Vyc2VzL1wiICsgcGFyYW1ldGVycy5jb3Vyc2VJZDtcbiAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGNvbW1vbl8xLkhUVFBSZXF1ZXN0LmRlbGV0ZUFzeW5jKHBhdGgsIG51bGwpLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgcmVzb2x2ZShyZXNwb25zZSk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcInBhdGNoQ291cnNlXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHBhdGNoQ291cnNlKHBhcmFtZXRlcnMpIHtcbiAgICAgIHZhciBwYXRoID0gXCIvbGVhcm4vYXBpL3B1YmxpYy92MS9jb3Vyc2VzL1wiICsgcGFyYW1ldGVycy5jb3Vyc2VJZDtcbiAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGNvbW1vbl8xLkhUVFBSZXF1ZXN0LnBhdGNoQXN5bmMocGF0aCwgbnVsbCkudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICByZXNvbHZlKHJlc3BvbnNlKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiZ2V0Q291cnNlQ29udGVudHNcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gZ2V0Q291cnNlQ29udGVudHMocGFyYW1ldGVycykge1xuICAgICAgdmFyIHBhdGggPSBcIi9sZWFybi9hcGkvcHVibGljL3YxL2NvdXJzZXMvXCIgKyBwYXJhbWV0ZXJzLmNvdXJzZUlkICsgXCIvY29udGVudHNcIjtcbiAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGNvbW1vbl8xLkhUVFBSZXF1ZXN0LmdldEFzeW5jKHBhdGgpLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgdmFyIGFsbENvdXJzZUNvbnRlbnRzID0gSlNPTi5wYXJzZShyZXNwb25zZSk7XG4gICAgICAgICAgdmFyIHJlc3BvbnNlSW5mbyA9IG5ldyBBcnJheSgpO1xuICAgICAgICAgIGFsbENvdXJzZUNvbnRlbnRzLnJlc3VsdHMuZm9yRWFjaChmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgICAgICAgICB2YXIgcmVzdWx0T2JqZWN0ID0ge1xuICAgICAgICAgICAgICBhbGxvd0d1ZXN0czogcmVzdWx0LmF2YWlsYWJpbGl0eS5hbGxvd0d1ZXN0cyxcbiAgICAgICAgICAgICAgYXZhaWxhYmxlOiByZXN1bHQuYXZhaWxhYmlsaXR5LmF2YWlsYWJsZSxcbiAgICAgICAgICAgICAgYm9keTogcmVzdWx0LmJvZHksXG4gICAgICAgICAgICAgIGNyZWF0ZWQ6IHJlc3VsdC5jcmVhdGVkLFxuICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogcmVzdWx0LmRlc2NyaXB0aW9uLFxuICAgICAgICAgICAgICBoYXNBc3NvY2lhdGVkR3JvdXBzOiByZXN1bHQuaGFzQXNzb2NpYXRlZEdyb3VwcyxcbiAgICAgICAgICAgICAgaGFzQ2hpbGRyZW46IHJlc3VsdC5oYXNDaGlsZHJlbixcbiAgICAgICAgICAgICAgaGFzR3JhZGVib29rQ29sdW1uczogcmVzdWx0Lmhhc0dyYWRlYm9va0NvbHVtbnMsXG4gICAgICAgICAgICAgIGlkOiByZXN1bHQuaWQsXG4gICAgICAgICAgICAgIHBhcmVudElkOiByZXN1bHQucGFyZW50SWQsXG4gICAgICAgICAgICAgIHBvc2l0aW9uOiByZXN1bHQucG9zaXRpb24sXG4gICAgICAgICAgICAgIHRpdGxlOiByZXN1bHQudGl0bGVcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICByZXNwb25zZUluZm8ucHVzaChyZXN1bHRPYmplY3QpO1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIHJlc29sdmUocmVzcG9uc2VJbmZvKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwicG9zdENvdXJzZUNvbnRlbnRcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gcG9zdENvdXJzZUNvbnRlbnQocGFyYW1ldGVycykge1xuICAgICAgdmFyIHBhdGggPSBcIi9sZWFybi9hcGkvcHVibGljL3YxL2NvdXJzZXMvXCIgKyBwYXJhbWV0ZXJzLmNvdXJzZUlkICsgJy9jb250ZW50cyc7XG4gICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBjb21tb25fMS5IVFRQUmVxdWVzdC5wb3N0QXN5bmMocGF0aCwgbnVsbCkudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICByZXNvbHZlKHJlc3BvbnNlKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiZGVsZXRlQ291cnNlQ29udGVudFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBkZWxldGVDb3Vyc2VDb250ZW50KHBhcmFtZXRlcnMpIHtcbiAgICAgIHZhciBwYXRoID0gXCIvbGVhcm4vYXBpL3B1YmxpYy92MS9jb3Vyc2VzL1wiICsgcGFyYW1ldGVycy5jb3Vyc2VJZCArICcvY29udGVudHMvJyArIHBhcmFtZXRlcnMuY29udGVudElkO1xuICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgY29tbW9uXzEuSFRUUFJlcXVlc3QuZGVsZXRlQXN5bmMocGF0aCwgbnVsbCkudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICByZXNvbHZlKHJlc3BvbnNlKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwicGF0Y2hDb3Vyc2VDb250ZW50XCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHBhdGNoQ291cnNlQ29udGVudChwYXJhbWV0ZXJzKSB7XG4gICAgICB2YXIgcGF0aCA9IFwiL2xlYXJuL2FwaS9wdWJsaWMvdjEvY291cnNlcy9cIiArIHBhcmFtZXRlcnMuY291cnNlSWQgKyBcIi9jb250ZW50cy9cIiArIHBhcmFtZXRlcnMuY29udGVudElkO1xuICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgY29tbW9uXzEuSFRUUFJlcXVlc3QucGF0Y2hBc3luYyhwYXRoLCBudWxsKS50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgIHJlc29sdmUocmVzcG9uc2UpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJnZXRDb3Vyc2VDb250ZW50XCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGdldENvdXJzZUNvbnRlbnQocGFyYW1ldGVycykge1xuICAgICAgdmFyIHBhdGggPSBcIi9sZWFybi9hcGkvcHVibGljL3YxL2NvdXJzZXMvXCIgKyBwYXJhbWV0ZXJzLmNvdXJzZUlkICsgXCIvY29udGVudHMvXCIgKyBwYXJhbWV0ZXJzLmNvbnRlbnRJZDtcbiAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGNvbW1vbl8xLkhUVFBSZXF1ZXN0LmdldEFzeW5jKHBhdGgpLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgdmFyIHJlc3VsdCA9IEpTT04ucGFyc2UocmVzcG9uc2UpO1xuICAgICAgICAgIHZhciByZXN1bHRPYmplY3QgPSB7XG4gICAgICAgICAgICBhbGxvd0d1ZXN0czogcmVzdWx0LmF2YWlsYWJpbGl0eS5hbGxvd0d1ZXN0cyxcbiAgICAgICAgICAgIGF2YWlsYWJsZTogcmVzdWx0LmF2YWlsYWJpbGl0eS5hdmFpbGFibGUsXG4gICAgICAgICAgICBib2R5OiByZXN1bHQuYm9keSxcbiAgICAgICAgICAgIGNyZWF0ZWQ6IHJlc3VsdC5jcmVhdGVkLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IHJlc3VsdC5kZXNjcmlwdGlvbixcbiAgICAgICAgICAgIGhhc0Fzc29jaWF0ZWRHcm91cHM6IHJlc3VsdC5oYXNBc3NvY2lhdGVkR3JvdXBzLFxuICAgICAgICAgICAgaGFzQ2hpbGRyZW46IHJlc3VsdC5oYXNDaGlsZHJlbixcbiAgICAgICAgICAgIGhhc0dyYWRlYm9va0NvbHVtbnM6IHJlc3VsdC5oYXNHcmFkZWJvb2tDb2x1bW5zLFxuICAgICAgICAgICAgaWQ6IHJlc3VsdC5pZCxcbiAgICAgICAgICAgIHBhcmVudElkOiByZXN1bHQucGFyZW50SWQsXG4gICAgICAgICAgICBwb3NpdGlvbjogcmVzdWx0LnBvc2l0aW9uLFxuICAgICAgICAgICAgdGl0bGU6IHJlc3VsdC50aXRsZVxuICAgICAgICAgIH07XG4gICAgICAgICAgcmVzb2x2ZShyZXN1bHRPYmplY3QpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJnZXRDb3Vyc2VDb250ZW50Q2hpbGRyZW5cIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gZ2V0Q291cnNlQ29udGVudENoaWxkcmVuKHBhcmFtZXRlcnMpIHtcbiAgICAgIHZhciBwYXRoID0gXCIvbGVhcm4vYXBpL3B1YmxpYy92MS9jb3Vyc2VzL1wiICsgcGFyYW1ldGVycy5jb3Vyc2VJZCArIFwiL2NvbnRlbnRzL1wiICsgcGFyYW1ldGVycy5jb250ZW50SWQgKyAnL2NoaWxkcmVuJztcbiAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGNvbW1vbl8xLkhUVFBSZXF1ZXN0LmdldEFzeW5jKHBhdGgpLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgdmFyIGFsbENvdXJzZUNvbnRlbnRzID0gSlNPTi5wYXJzZShyZXNwb25zZSk7XG4gICAgICAgICAgdmFyIHJlc3BvbnNlSW5mbyA9IG5ldyBBcnJheSgpO1xuICAgICAgICAgIGFsbENvdXJzZUNvbnRlbnRzLnJlc3VsdHMuZm9yRWFjaChmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgICAgICAgICB2YXIgcmVzdWx0T2JqZWN0ID0ge1xuICAgICAgICAgICAgICBhbGxvd0d1ZXN0czogcmVzdWx0LmF2YWlsYWJpbGl0eS5hbGxvd0d1ZXN0cyxcbiAgICAgICAgICAgICAgYXZhaWxhYmxlOiByZXN1bHQuYXZhaWxhYmlsaXR5LmF2YWlsYWJsZSxcbiAgICAgICAgICAgICAgYm9keTogcmVzdWx0LmJvZHksXG4gICAgICAgICAgICAgIGNyZWF0ZWQ6IHJlc3VsdC5jcmVhdGVkLFxuICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogcmVzdWx0LmRlc2NyaXB0aW9uLFxuICAgICAgICAgICAgICBoYXNBc3NvY2lhdGVkR3JvdXBzOiByZXN1bHQuaGFzQXNzb2NpYXRlZEdyb3VwcyxcbiAgICAgICAgICAgICAgaGFzQ2hpbGRyZW46IHJlc3VsdC5oYXNDaGlsZHJlbixcbiAgICAgICAgICAgICAgaGFzR3JhZGVib29rQ29sdW1uczogcmVzdWx0Lmhhc0dyYWRlYm9va0NvbHVtbnMsXG4gICAgICAgICAgICAgIGlkOiByZXN1bHQuaWQsXG4gICAgICAgICAgICAgIHBhcmVudElkOiByZXN1bHQucGFyZW50SWQsXG4gICAgICAgICAgICAgIHBvc2l0aW9uOiByZXN1bHQucG9zaXRpb24sXG4gICAgICAgICAgICAgIHRpdGxlOiByZXN1bHQudGl0bGVcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICByZXNwb25zZUluZm8ucHVzaChyZXN1bHRPYmplY3QpO1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIHJlc29sdmUocmVzcG9uc2VJbmZvKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwicG9zdENvdXJzZUNvbnRlbnRDaGlsZHJlblwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBwb3N0Q291cnNlQ29udGVudENoaWxkcmVuKHBhcmFtZXRlcnMpIHtcbiAgICAgIHZhciBwYXRoID0gXCIvbGVhcm4vYXBpL3B1YmxpYy92MS9jb3Vyc2VzL1wiICsgcGFyYW1ldGVycy5jb3Vyc2VJZCArIFwiL2NvbnRlbnRzL1wiICsgcGFyYW1ldGVycy5jb250ZW50SWQgKyAnL2NoaWxkcmVuJztcbiAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGNvbW1vbl8xLkhUVFBSZXF1ZXN0LnBvc3RBc3luYyhwYXRoLCBudWxsKS50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgIHJlc29sdmUocmVzcG9uc2UpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJnZXRDb3Vyc2VDaGlsZHJlblwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBnZXRDb3Vyc2VDaGlsZHJlbihwYXJhbWV0ZXJzKSB7XG4gICAgICB2YXIgcGF0aCA9IFwiL2xlYXJuL2FwaS9wdWJsaWMvdjEvY291cnNlcy9cIiArIHBhcmFtZXRlcnMuY291cnNlSWQgKyBcIi9jaGlsZHJlblwiO1xuICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgY29tbW9uXzEuSFRUUFJlcXVlc3QuZ2V0QXN5bmMocGF0aCkudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICB2YXIgYWxsQ291cnNlQ2hpbGRyZW4gPSBKU09OLnBhcnNlKHJlc3BvbnNlKTtcbiAgICAgICAgICB2YXIgcmVzcG9uc2VJbmZvID0gbmV3IEFycmF5KCk7XG4gICAgICAgICAgYWxsQ291cnNlQ2hpbGRyZW4ucmVzdWx0cy5mb3JFYWNoKGZ1bmN0aW9uIChyZXN1bHQpIHtcbiAgICAgICAgICAgIHZhciByZXN1bHRPYmplY3QgPSB7XG4gICAgICAgICAgICAgIGNyZWF0ZWQ6IHJlc3VsdC5jcmVhdGVkLFxuICAgICAgICAgICAgICBkYXRhc291cmNlSWQ6IHJlc3VsdC5kYXRhc291cmNlSWQsXG4gICAgICAgICAgICAgIGlkOiByZXN1bHQuaWRcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICByZXNwb25zZUluZm8ucHVzaChyZXN1bHRPYmplY3QpO1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIHJlc29sdmUocmVzcG9uc2VJbmZvKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiZ2V0QXNzaWdubWVudENvbHNcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gZ2V0QXNzaWdubWVudENvbHMocGFyYW1ldGVycykge1xuICAgICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgICAgdmFyIHBhdGggPSBcIi9sZWFybi9hcGkvcHVibGljL3YyL2NvdXJzZXMvXCIgKyBwYXJhbWV0ZXJzLmNvdXJzZUlkICsgXCIvZ3JhZGVib29rL2NvbHVtbnNcIjtcbiAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGNvbW1vbl8xLkhUVFBSZXF1ZXN0LmdldEFzeW5jKHBhdGgpLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgdmFyIGNvbHVtbnMgPSBKU09OLnBhcnNlKHJlc3BvbnNlKS5yZXN1bHRzO1xuICAgICAgICAgIHZhciByZXN1bHQgPSBbXTtcbiAgICAgICAgICB2YXIgX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbiA9IHRydWU7XG4gICAgICAgICAgdmFyIF9kaWRJdGVyYXRvckVycm9yID0gZmFsc2U7XG4gICAgICAgICAgdmFyIF9pdGVyYXRvckVycm9yID0gdW5kZWZpbmVkO1xuXG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGZvciAodmFyIF9pdGVyYXRvciA9IGNvbHVtbnNbU3ltYm9sLml0ZXJhdG9yXSgpLCBfc3RlcDsgIShfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uID0gKF9zdGVwID0gX2l0ZXJhdG9yLm5leHQoKSkuZG9uZSk7IF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24gPSB0cnVlKSB7XG4gICAgICAgICAgICAgIHZhciBjb2x1bW4gPSBfc3RlcC52YWx1ZTtcbiAgICAgICAgICAgICAgcmVzdWx0LnB1c2goX3RoaXMuY3JlYXRlSUFzc2lnbm1lbnQoY29sdW1uKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICBfZGlkSXRlcmF0b3JFcnJvciA9IHRydWU7XG4gICAgICAgICAgICBfaXRlcmF0b3JFcnJvciA9IGVycjtcbiAgICAgICAgICB9IGZpbmFsbHkge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgaWYgKCFfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uICYmIF9pdGVyYXRvcltcInJldHVyblwiXSAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgX2l0ZXJhdG9yW1wicmV0dXJuXCJdKCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZmluYWxseSB7XG4gICAgICAgICAgICAgIGlmIChfZGlkSXRlcmF0b3JFcnJvcikge1xuICAgICAgICAgICAgICAgIHRocm93IF9pdGVyYXRvckVycm9yO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmVzb2x2ZShyZXN1bHQpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJnZXRBbm5vdW5jZW1lbnRzXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGdldEFubm91bmNlbWVudHMocGFyYW1ldGVycykge1xuICAgICAgdmFyIF90aGlzMiA9IHRoaXM7XG5cbiAgICAgIHZhciBwYXRoID0gXCIvd2ViYXBwcy9ibGFja2JvYXJkL2V4ZWN1dGUvYW5ub3VuY2VtZW50P21ldGhvZD1zZWFyY2gmY29udGV4dD1jb3Vyc2VfZW50cnkmY291cnNlX2lkPVwiICsgcGFyYW1ldGVycy5jb3Vyc2VJZCArIFwiJmhhbmRsZT1hbm5vdW5jZW1lbnRzX2VudHJ5Jm1vZGU9dmlld1wiO1xuICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgY29tbW9uXzEuSFRUUFJlcXVlc3QuZ2V0QXN5bmMocGF0aCkudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICB2YXIgcGFyc2VyID0gbmV3IERPTVBhcnNlcigpO1xuICAgICAgICAgIHZhciBwYXJzZWRIdG1sID0gcGFyc2VyLnBhcnNlRnJvbVN0cmluZyhyZXNwb25zZSwgJ3RleHQvaHRtbCcpO1xuICAgICAgICAgIHZhciBwYXJzZWRBbm5vdW5jZW1lbnRzID0gW107XG4gICAgICAgICAgdmFyIGFubm91bmNlbWVudHMgPSBwYXJzZWRIdG1sLmdldEVsZW1lbnRCeUlkKCdhbm5vdW5jZW1lbnRMaXN0JykuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2xpJyk7XG4gICAgICAgICAgdmFyIF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24yID0gdHJ1ZTtcbiAgICAgICAgICB2YXIgX2RpZEl0ZXJhdG9yRXJyb3IyID0gZmFsc2U7XG4gICAgICAgICAgdmFyIF9pdGVyYXRvckVycm9yMiA9IHVuZGVmaW5lZDtcblxuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICBmb3IgKHZhciBfaXRlcmF0b3IyID0gYW5ub3VuY2VtZW50c1tTeW1ib2wuaXRlcmF0b3JdKCksIF9zdGVwMjsgIShfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uMiA9IChfc3RlcDIgPSBfaXRlcmF0b3IyLm5leHQoKSkuZG9uZSk7IF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24yID0gdHJ1ZSkge1xuICAgICAgICAgICAgICB2YXIgYSA9IF9zdGVwMi52YWx1ZTtcbiAgICAgICAgICAgICAgdmFyIGluZm9ybWF0aW9uID0ge1xuICAgICAgICAgICAgICAgIGlkOiBcIlwiLFxuICAgICAgICAgICAgICAgIHRpdGxlOiBcIlwiLFxuICAgICAgICAgICAgICAgIGRhdGVQb3N0ZWQ6IFwiXCIsXG4gICAgICAgICAgICAgICAgcG9zdGVkQnk6IFwiXCIsXG4gICAgICAgICAgICAgICAgcG9zdGVkVG86IFwiXCIsXG4gICAgICAgICAgICAgICAgY29udGVudDogXCJcIlxuICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICBpbmZvcm1hdGlvbi5pZCA9IGEuaWQ7XG4gICAgICAgICAgICAgIGluZm9ybWF0aW9uLnRpdGxlID0gYS5nZXRFbGVtZW50c0J5VGFnTmFtZShcImgzXCIpWzBdLmlubmVyVGV4dDtcbiAgICAgICAgICAgICAgdmFyIGRldGFpbERpdiA9IGEuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcImRldGFpbHNcIilbMF07XG4gICAgICAgICAgICAgIGluZm9ybWF0aW9uLmRhdGVQb3N0ZWQgPSBkZXRhaWxEaXYuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJwXCIpWzBdLmdldEVsZW1lbnRzQnlUYWdOYW1lKFwic3BhblwiKVswXS5pbm5lckhUTUw7XG4gICAgICAgICAgICAgIGluZm9ybWF0aW9uLmNvbnRlbnQgPSBkZXRhaWxEaXYuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcInZ0YmVnZW5lcmF0ZWRcIilbMF0uZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJwXCIpWzBdLmlubmVySFRNTDtcbiAgICAgICAgICAgICAgcGFyc2VkQW5ub3VuY2VtZW50cy5wdXNoKF90aGlzMi5jcmVhdGVJQW5ub3VuY2VtZW50KGluZm9ybWF0aW9uKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICBfZGlkSXRlcmF0b3JFcnJvcjIgPSB0cnVlO1xuICAgICAgICAgICAgX2l0ZXJhdG9yRXJyb3IyID0gZXJyO1xuICAgICAgICAgIH0gZmluYWxseSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICBpZiAoIV9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24yICYmIF9pdGVyYXRvcjJbXCJyZXR1cm5cIl0gIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIF9pdGVyYXRvcjJbXCJyZXR1cm5cIl0oKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgICAgICAgaWYgKF9kaWRJdGVyYXRvckVycm9yMikge1xuICAgICAgICAgICAgICAgIHRocm93IF9pdGVyYXRvckVycm9yMjtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIHJlc29sdmUocGFyc2VkQW5ub3VuY2VtZW50cyk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImNyZWF0ZUlBc3NpZ25tZW50XCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGNyZWF0ZUlBc3NpZ25tZW50KGluZm9ybWF0aW9uKSB7XG4gICAgICBpZiAodHlwZW9mIGluZm9ybWF0aW9uLmF2YWlsYWJpbGl0eSAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIGF0dGVtcHRzQWxsb3dlZDogaW5mb3JtYXRpb24uZ3JhZGluZy5hdHRlbXB0c0FsbG93ZWQsXG4gICAgICAgICAgYXZhaWxhYmxlOiBjb21tb25fMS5VdGlsaXRpZXMuc3RyaW5nVG9Cb29sZWFuKGluZm9ybWF0aW9uLmF2YWlsYWJpbGl0eS5hdmFpbGFibGUpLFxuICAgICAgICAgIGNvbnRlbnRJZDogaW5mb3JtYXRpb24uY29udGVudElkLFxuICAgICAgICAgIGRlc2M6IGluZm9ybWF0aW9uLmRlc2NyaXB0aW9uLFxuICAgICAgICAgIGR1ZTogaW5mb3JtYXRpb24uZ3JhZGluZy5kdWUsXG4gICAgICAgICAgaWQ6IGluZm9ybWF0aW9uLmlkLFxuICAgICAgICAgIG5hbWU6IGluZm9ybWF0aW9uLm5hbWUsXG4gICAgICAgICAgc2NvcmU6IGluZm9ybWF0aW9uLnNjb3JlLnBvc3NpYmxlXG4gICAgICAgIH07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIGF0dGVtcHRzQWxsb3dlZDogaW5mb3JtYXRpb24uZ3JhZGluZy5hdHRlbXB0c0FsbG93ZWQsXG4gICAgICAgICAgYXZhaWxhYmxlOiBudWxsLFxuICAgICAgICAgIGNvbnRlbnRJZDogaW5mb3JtYXRpb24uY29udGVudElkLFxuICAgICAgICAgIGRlc2M6IG51bGwsXG4gICAgICAgICAgZHVlOiBpbmZvcm1hdGlvbi5ncmFkaW5nLmR1ZSxcbiAgICAgICAgICBpZDogaW5mb3JtYXRpb24uaWQsXG4gICAgICAgICAgbmFtZTogaW5mb3JtYXRpb24ubmFtZSxcbiAgICAgICAgICBzY29yZTogaW5mb3JtYXRpb24uc2NvcmUucG9zc2libGVcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiY3JlYXRlSUFubm91bmNlbWVudFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBjcmVhdGVJQW5ub3VuY2VtZW50KGluZm9ybWF0aW9uKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBjb250ZW50OiBpbmZvcm1hdGlvbi5jb250ZW50LFxuICAgICAgICBkYXRlUG9zdGVkOiBpbmZvcm1hdGlvbi5kYXRlUG9zdGVkLFxuICAgICAgICBpZDogaW5mb3JtYXRpb24uaWQsXG4gICAgICAgIHRpdGxlOiBpbmZvcm1hdGlvbi50aXRsZVxuICAgICAgfTtcbiAgICB9XG4gIH1dKTtcblxuICByZXR1cm4gQkJDb3Vyc2VzO1xufShjb3Vyc2VzXzFbXCJkZWZhdWx0XCJdKTtcblxuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBCQkNvdXJzZXM7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmZ1bmN0aW9uIF90eXBlb2Yob2JqKSB7IGlmICh0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgdHlwZW9mIFN5bWJvbC5pdGVyYXRvciA9PT0gXCJzeW1ib2xcIikgeyBfdHlwZW9mID0gZnVuY3Rpb24gX3R5cGVvZihvYmopIHsgcmV0dXJuIHR5cGVvZiBvYmo7IH07IH0gZWxzZSB7IF90eXBlb2YgPSBmdW5jdGlvbiBfdHlwZW9mKG9iaikgeyByZXR1cm4gb2JqICYmIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvYmouY29uc3RydWN0b3IgPT09IFN5bWJvbCAmJiBvYmogIT09IFN5bWJvbC5wcm90b3R5cGUgPyBcInN5bWJvbFwiIDogdHlwZW9mIG9iajsgfTsgfSByZXR1cm4gX3R5cGVvZihvYmopOyB9XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5cbmZ1bmN0aW9uIF9kZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHsgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykgeyB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldOyBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7IGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTsgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpOyB9IH1cblxuZnVuY3Rpb24gX2NyZWF0ZUNsYXNzKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykgeyBpZiAocHJvdG9Qcm9wcykgX2RlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTsgaWYgKHN0YXRpY1Byb3BzKSBfZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpOyByZXR1cm4gQ29uc3RydWN0b3I7IH1cblxuZnVuY3Rpb24gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4oc2VsZiwgY2FsbCkgeyBpZiAoY2FsbCAmJiAoX3R5cGVvZihjYWxsKSA9PT0gXCJvYmplY3RcIiB8fCB0eXBlb2YgY2FsbCA9PT0gXCJmdW5jdGlvblwiKSkgeyByZXR1cm4gY2FsbDsgfSByZXR1cm4gX2Fzc2VydFRoaXNJbml0aWFsaXplZChzZWxmKTsgfVxuXG5mdW5jdGlvbiBfYXNzZXJ0VGhpc0luaXRpYWxpemVkKHNlbGYpIHsgaWYgKHNlbGYgPT09IHZvaWQgMCkgeyB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoXCJ0aGlzIGhhc24ndCBiZWVuIGluaXRpYWxpc2VkIC0gc3VwZXIoKSBoYXNuJ3QgYmVlbiBjYWxsZWRcIik7IH0gcmV0dXJuIHNlbGY7IH1cblxuZnVuY3Rpb24gX2dldFByb3RvdHlwZU9mKG8pIHsgX2dldFByb3RvdHlwZU9mID0gT2JqZWN0LnNldFByb3RvdHlwZU9mID8gT2JqZWN0LmdldFByb3RvdHlwZU9mIDogZnVuY3Rpb24gX2dldFByb3RvdHlwZU9mKG8pIHsgcmV0dXJuIG8uX19wcm90b19fIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihvKTsgfTsgcmV0dXJuIF9nZXRQcm90b3R5cGVPZihvKTsgfVxuXG5mdW5jdGlvbiBfaW5oZXJpdHMoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHsgaWYgKHR5cGVvZiBzdXBlckNsYXNzICE9PSBcImZ1bmN0aW9uXCIgJiYgc3VwZXJDbGFzcyAhPT0gbnVsbCkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3VwZXIgZXhwcmVzc2lvbiBtdXN0IGVpdGhlciBiZSBudWxsIG9yIGEgZnVuY3Rpb25cIik7IH0gc3ViQ2xhc3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzICYmIHN1cGVyQ2xhc3MucHJvdG90eXBlLCB7IGNvbnN0cnVjdG9yOiB7IHZhbHVlOiBzdWJDbGFzcywgd3JpdGFibGU6IHRydWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSB9IH0pOyBpZiAoc3VwZXJDbGFzcykgX3NldFByb3RvdHlwZU9mKHN1YkNsYXNzLCBzdXBlckNsYXNzKTsgfVxuXG5mdW5jdGlvbiBfc2V0UHJvdG90eXBlT2YobywgcCkgeyBfc2V0UHJvdG90eXBlT2YgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHwgZnVuY3Rpb24gX3NldFByb3RvdHlwZU9mKG8sIHApIHsgby5fX3Byb3RvX18gPSBwOyByZXR1cm4gbzsgfTsgcmV0dXJuIF9zZXRQcm90b3R5cGVPZihvLCBwKTsgfVxuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgY29tbW9uXzEgPSByZXF1aXJlKFwiLi4vLi4vY29tbW9uXCIpO1xuXG52YXIgZW1haWxfMSA9IHJlcXVpcmUoXCIuLi8uLi9jb21tb24vQkJBYnN0cmFjdEJhY2tlbmQvZW1haWxcIik7XG5cbnZhciBCQkVtYWlscyA9XG4vKiNfX1BVUkVfXyovXG5mdW5jdGlvbiAoX2VtYWlsXzEkZGVmYXVsdCkge1xuICBfaW5oZXJpdHMoQkJFbWFpbHMsIF9lbWFpbF8xJGRlZmF1bHQpO1xuXG4gIGZ1bmN0aW9uIEJCRW1haWxzKCkge1xuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBCQkVtYWlscyk7XG5cbiAgICByZXR1cm4gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4odGhpcywgX2dldFByb3RvdHlwZU9mKEJCRW1haWxzKS5hcHBseSh0aGlzLCBhcmd1bWVudHMpKTtcbiAgfVxuXG4gIF9jcmVhdGVDbGFzcyhCQkVtYWlscywgW3tcbiAgICBrZXk6IFwic2VuZE1haWxcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gc2VuZE1haWwocGFyYW1ldGVycykge1xuICAgICAgdmFyIGJhc2VQYXRoID0gJy93ZWJhcHBzL2JsYWNrYm9hcmQvZXhlY3V0ZSc7XG4gICAgICB2YXIgY29tbW9uUGFyYW1ldGVycyA9IFwiP25hdkl0ZW09XCIgKyBwYXJhbWV0ZXJzLnJlY2lwaWVudHMubmF2SXRlbSArIFwiJmNvdXJzZV9pZD1cIiArIHBhcmFtZXRlcnMuY291cnNlSWQ7XG4gICAgICB2YXIgZm9ybVBhdGggPSBiYXNlUGF0aCArICcvZGlzcGxheUVtYWlsJyArIGNvbW1vblBhcmFtZXRlcnM7XG4gICAgICB2YXIgc2VuZFBhdGggPSBiYXNlUGF0aCArICcvc2VuZEVtYWlsJyArIGNvbW1vblBhcmFtZXRlcnM7XG4gICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBjb21tb25fMS5IVFRQUmVxdWVzdC5nZXRBc3luYyhmb3JtUGF0aCkudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICB2YXIgcGFyc2VyID0gbmV3IERPTVBhcnNlcigpO1xuICAgICAgICAgIHZhciBkb20gPSBwYXJzZXIucGFyc2VGcm9tU3RyaW5nKHJlc3BvbnNlLCAndGV4dC9odG1sJyk7XG4gICAgICAgICAgdmFyIHNlY3VyaXR5Tm9uY2UgPSBjb21tb25fMS5VdGlsaXRpZXMuZ2V0Tm9uY2VGcm9tRm9ybShkb20sICdlbWFpbEZvcm0nKTtcbiAgICAgICAgICB2YXIgZm9ybURhdGEgPSBuZXcgRm9ybURhdGEoKTtcbiAgICAgICAgICBmb3JtRGF0YS5hcHBlbmQoJ2JsYWNrYm9hcmQucGxhdGZvcm0uc2VjdXJpdHkuTm9uY2VVdGlsLm5vbmNlJywgc2VjdXJpdHlOb25jZSk7XG4gICAgICAgICAgZm9ybURhdGEuYXBwZW5kKCduYXZJdGVtJywgcGFyYW1ldGVycy5yZWNpcGllbnRzLm5hdkl0ZW0pO1xuICAgICAgICAgIGZvcm1EYXRhLmFwcGVuZCgnbWVzc2FnZXRleHRfZicsICcnKTtcbiAgICAgICAgICBmb3JtRGF0YS5hcHBlbmQoJ21lc3NhZ2V0ZXh0X3cnLCAnJyk7XG4gICAgICAgICAgZm9ybURhdGEuYXBwZW5kKCdtZXNzYWdldHlwZScsICcnKTtcbiAgICAgICAgICBmb3JtRGF0YS5hcHBlbmQoJ3RleHRib3hfcHJlZml4JywgJ21lc3NhZ2V0ZXh0Jyk7XG4gICAgICAgICAgZm9ybURhdGEuYXBwZW5kKCdjb3Vyc2VfaWQnLCBwYXJhbWV0ZXJzLmNvdXJzZUlkKTtcbiAgICAgICAgICBmb3JtRGF0YS5hcHBlbmQoJ3N1YmplY3QnLCBwYXJhbWV0ZXJzLnN1YmplY3QpO1xuICAgICAgICAgIGZvcm1EYXRhLmFwcGVuZCgnbWVzc2FnZXRleHQnLCBwYXJhbWV0ZXJzLmJvZHkpO1xuXG4gICAgICAgICAgaWYgKHBhcmFtZXRlcnMucmVjaXBpZW50cy50YXJnZXRzICE9PSAnJykge1xuICAgICAgICAgICAgZm9ybURhdGEuYXBwZW5kKCdtdWx0aXNlbGVjdF9yaWdodF92YWx1ZXMnLCBwYXJhbWV0ZXJzLnJlY2lwaWVudHMudGFyZ2V0cyk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKHBhcmFtZXRlcnMuYXR0YWNobWVudHMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwYXJhbWV0ZXJzLmF0dGFjaG1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgIHZhciBuYW1lID0gJ2VtYWlsX2ZpbGVfJyArIChpICsgMSkudG9TdHJpbmcoKTtcbiAgICAgICAgICAgICAgZm9ybURhdGEuYXBwZW5kKG5hbWUsIHBhcmFtZXRlcnMuYXR0YWNobWVudHNbaV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChwYXJhbWV0ZXJzLnJldHVyblJlY2lwaWVudCkge1xuICAgICAgICAgICAgZm9ybURhdGEuYXBwZW5kKCdwcmVwZW5kUmVjaXBpZW50TmFtZXMnLCAnb24nKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXR1cm4gY29tbW9uXzEuSFRUUFJlcXVlc3QucG9zdEFzeW5jKHNlbmRQYXRoLCBmb3JtRGF0YSk7XG4gICAgICAgIH0pLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgdmFyIHJlc3VsdE9iamVjdCA9IHtcbiAgICAgICAgICAgIHN1Y2Nlc3M6IHRydWVcbiAgICAgICAgICB9O1xuICAgICAgICAgIHJlc29sdmUocmVzdWx0T2JqZWN0KTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1dKTtcblxuICByZXR1cm4gQkJFbWFpbHM7XG59KGVtYWlsXzFbXCJkZWZhdWx0XCJdKTtcblxuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBCQkVtYWlsczsiLCJcInVzZSBzdHJpY3RcIjtcblxuZnVuY3Rpb24gX3R5cGVvZihvYmopIHsgaWYgKHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiB0eXBlb2YgU3ltYm9sLml0ZXJhdG9yID09PSBcInN5bWJvbFwiKSB7IF90eXBlb2YgPSBmdW5jdGlvbiBfdHlwZW9mKG9iaikgeyByZXR1cm4gdHlwZW9mIG9iajsgfTsgfSBlbHNlIHsgX3R5cGVvZiA9IGZ1bmN0aW9uIF90eXBlb2Yob2JqKSB7IHJldHVybiBvYmogJiYgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9iai5jb25zdHJ1Y3RvciA9PT0gU3ltYm9sICYmIG9iaiAhPT0gU3ltYm9sLnByb3RvdHlwZSA/IFwic3ltYm9sXCIgOiB0eXBlb2Ygb2JqOyB9OyB9IHJldHVybiBfdHlwZW9mKG9iaik7IH1cblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxuZnVuY3Rpb24gX2RlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7IHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07IGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTsgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlOyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7IH0gfVxuXG5mdW5jdGlvbiBfY3JlYXRlQ2xhc3MoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7IGlmIChwcm90b1Byb3BzKSBfZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpOyBpZiAoc3RhdGljUHJvcHMpIF9kZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7IHJldHVybiBDb25zdHJ1Y3RvcjsgfVxuXG5mdW5jdGlvbiBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybihzZWxmLCBjYWxsKSB7IGlmIChjYWxsICYmIChfdHlwZW9mKGNhbGwpID09PSBcIm9iamVjdFwiIHx8IHR5cGVvZiBjYWxsID09PSBcImZ1bmN0aW9uXCIpKSB7IHJldHVybiBjYWxsOyB9IHJldHVybiBfYXNzZXJ0VGhpc0luaXRpYWxpemVkKHNlbGYpOyB9XG5cbmZ1bmN0aW9uIF9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQoc2VsZikgeyBpZiAoc2VsZiA9PT0gdm9pZCAwKSB7IHRocm93IG5ldyBSZWZlcmVuY2VFcnJvcihcInRoaXMgaGFzbid0IGJlZW4gaW5pdGlhbGlzZWQgLSBzdXBlcigpIGhhc24ndCBiZWVuIGNhbGxlZFwiKTsgfSByZXR1cm4gc2VsZjsgfVxuXG5mdW5jdGlvbiBfZ2V0UHJvdG90eXBlT2YobykgeyBfZ2V0UHJvdG90eXBlT2YgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgPyBPYmplY3QuZ2V0UHJvdG90eXBlT2YgOiBmdW5jdGlvbiBfZ2V0UHJvdG90eXBlT2YobykgeyByZXR1cm4gby5fX3Byb3RvX18gfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKG8pOyB9OyByZXR1cm4gX2dldFByb3RvdHlwZU9mKG8pOyB9XG5cbmZ1bmN0aW9uIF9pbmhlcml0cyhzdWJDbGFzcywgc3VwZXJDbGFzcykgeyBpZiAodHlwZW9mIHN1cGVyQ2xhc3MgIT09IFwiZnVuY3Rpb25cIiAmJiBzdXBlckNsYXNzICE9PSBudWxsKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJTdXBlciBleHByZXNzaW9uIG11c3QgZWl0aGVyIGJlIG51bGwgb3IgYSBmdW5jdGlvblwiKTsgfSBzdWJDbGFzcy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MgJiYgc3VwZXJDbGFzcy5wcm90b3R5cGUsIHsgY29uc3RydWN0b3I6IHsgdmFsdWU6IHN1YkNsYXNzLCB3cml0YWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlIH0gfSk7IGlmIChzdXBlckNsYXNzKSBfc2V0UHJvdG90eXBlT2Yoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpOyB9XG5cbmZ1bmN0aW9uIF9zZXRQcm90b3R5cGVPZihvLCBwKSB7IF9zZXRQcm90b3R5cGVPZiA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fCBmdW5jdGlvbiBfc2V0UHJvdG90eXBlT2YobywgcCkgeyBvLl9fcHJvdG9fXyA9IHA7IHJldHVybiBvOyB9OyByZXR1cm4gX3NldFByb3RvdHlwZU9mKG8sIHApOyB9XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBjb21tb25fMSA9IHJlcXVpcmUoXCIuLi8uLi9jb21tb25cIik7XG5cbnZhciBmaWxlc18xID0gcmVxdWlyZShcIi4uLy4uL2NvbW1vbi9CQkFic3RyYWN0QmFja2VuZC9maWxlc1wiKTtcblxudmFyIEJCRmlsZXMgPVxuLyojX19QVVJFX18qL1xuZnVuY3Rpb24gKF9maWxlc18xJGRlZmF1bHQpIHtcbiAgX2luaGVyaXRzKEJCRmlsZXMsIF9maWxlc18xJGRlZmF1bHQpO1xuXG4gIGZ1bmN0aW9uIEJCRmlsZXMoKSB7XG4gICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIEJCRmlsZXMpO1xuXG4gICAgcmV0dXJuIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHRoaXMsIF9nZXRQcm90b3R5cGVPZihCQkZpbGVzKS5hcHBseSh0aGlzLCBhcmd1bWVudHMpKTtcbiAgfVxuXG4gIF9jcmVhdGVDbGFzcyhCQkZpbGVzLCBbe1xuICAgIGtleTogXCJnZXRGaWxlSW5mb1wiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBnZXRGaWxlSW5mbyhwYXJhbWV0ZXJzKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJNZXRob2Qgbm90IGltcGxlbWVudGVkLlwiKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiY3JlYXRlRm9sZGVyXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGNyZWF0ZUZvbGRlcihwYXJhbWV0ZXJzKSB7XG4gICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICB2YXIgdW5pcVBhdGggPSBcIi93ZWJhcHBzL2Ntc21haW4vd2VidWkvY291cnNlcy9cIiArIHBhcmFtZXRlcnMuY291cnNlSWQgKyBcIj9hY3Rpb249ZnJhbWVzZXQmc3ViYWN0aW9uPXZpZXcmY291cnNlX2lkPVwiICsgcGFyYW1ldGVycy5pZDtcbiAgICAgICAgY29tbW9uXzEuSFRUUFJlcXVlc3QuZ2V0QXN5bmModW5pcVBhdGgpLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgdmFyIHBhcnNlciA9IG5ldyBET01QYXJzZXIoKTtcbiAgICAgICAgICB2YXIgZG9tID0gcGFyc2VyLnBhcnNlRnJvbVN0cmluZyhyZXNwb25zZSwgJ3RleHQvaHRtbCcpO1xuICAgICAgICAgIHZhciB1bmlxRGl2ID0gZG9tLmdldEVsZW1lbnRCeUlkKFwiYWRkRm9sZGVyRm9ybVwiKTtcbiAgICAgICAgICB2YXIgdW5pcUZvcm0gPSB1bmlxRGl2LmZpcnN0RWxlbWVudENoaWxkO1xuICAgICAgICAgIHZhciB1bmlxRXhwciA9IC91bmlxPSguKikmYy9nO1xuICAgICAgICAgIHZhciB1bmlxID0gdW5pcUV4cHIuZXhlYyh1bmlxRm9ybS5hY3Rpb24pWzFdO1xuICAgICAgICAgIHZhciBub25jZUV4cHIgPSAvbm9uY2U9KC4qKS9nO1xuICAgICAgICAgIHZhciBub25jZSA9IG5vbmNlRXhwci5leGVjKHVuaXFGb3JtLmFjdGlvbilbMV07XG4gICAgICAgICAgdmFyIHBhdGggPSBcIi93ZWJhcHBzL2Ntc21haW4vd2VidWkvY291cnNlcy9cIiArIHBhcmFtZXRlcnMuY291cnNlSWQgKyBcIj9hY3Rpb249dXBsb2FkJnN1YmFjdGlvbj1jcmVhdGVkaXJlY3RvcnkmdW5pcT1cIiArIHVuaXEgKyBcIiZjb3Vyc2VfaWQ9XCIgKyBwYXJhbWV0ZXJzLmlkICsgXCImYmxhY2tib2FyZC5wbGF0Zm9ybS5zZWN1cml0eS5Ob25jZVV0aWwubm9uY2U9XCIgKyBub25jZTtcbiAgICAgICAgICBjb21tb25fMS5IVFRQUmVxdWVzdC5wb3N0QXN5bmMocGF0aCwgJ05FV0RJUjE9JyArIHBhcmFtZXRlcnMubmFtZSwgJ2Zvcm0nKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiZmlsZUFjdGlvblwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBmaWxlQWN0aW9uKHBhcmFtZXRlcnMsIGExLCBhY3Rpb24pIHtcbiAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIHZhciBwYXRoID0gXCIvd2ViYXBwcy9jbXNtYWluL3dlYnVpL2NvdXJzZXMvXCIgKyBwYXJhbWV0ZXJzLmNvdXJzZUlkO1xuICAgICAgICBpZiAoYWN0aW9uID09ICd6aXAnKSBwYXRoICs9ICcuemlwJztcbiAgICAgICAgdmFyIG5vbmNlUGF0aCA9IFwiL3dlYmFwcHMvY21zbWFpbi93ZWJ1aS9jb3Vyc2VzL1wiICsgcGFyYW1ldGVycy5jb3Vyc2VJZCArIFwiP2FjdGlvbj1mcmFtZXNldCZzdWJhY3Rpb249dmlldyZjb3Vyc2VfaWQ9XCIgKyBwYXJhbWV0ZXJzLmlkO1xuICAgICAgICBjb21tb25fMS5IVFRQUmVxdWVzdC5nZXRBc3luYyhub25jZVBhdGgpLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgdmFyIHBhcnNlciA9IG5ldyBET01QYXJzZXIoKTtcbiAgICAgICAgICB2YXIgZG9tID0gcGFyc2VyLnBhcnNlRnJvbVN0cmluZyhyZXNwb25zZSwgJ3RleHQvaHRtbCcpO1xuICAgICAgICAgIHZhciBub25jZUZvcm0gPSBkb20uZ2V0RWxlbWVudEJ5SWQoXCJmaWxlc0Zvcm1cIik7XG4gICAgICAgICAgdmFyIG5vbmNlSW5wdXQgPSBub25jZUZvcm0uY2hpbGRyZW5bMF07XG4gICAgICAgICAgY29tbW9uXzEuSFRUUFJlcXVlc3QucG9zdEFzeW5jKHBhdGgsIFwiYmxhY2tib2FyZC5wbGF0Zm9ybS5zZWN1cml0eS5Ob25jZVV0aWwubm9uY2U9XCIgKyBub25jZUlucHV0LnZhbHVlICsgXCImYTE9XCIgKyBhMSArIFwiJnN1YmFjdGlvbj1cIiArIGFjdGlvbiArIFwiJmNvdXJzZV9pZD1cIiArIHBhcmFtZXRlcnMuaWQgKyBcIiZyZXN0b3JlX3RyYXNoPWZhbHNlJndlYnVpcGF0aD0lMkZ3ZWJhcHBzJTJGY21zbWFpbiUyRndlYnVpJnNlbGVjdEFsbEZyb21MaXN0PWZhbHNlJmZpbGUwPSUyRmNvdXJzZXMlMkZcIiArIHBhcmFtZXRlcnMuY291cnNlSWQgKyBcIiUyRlwiICsgcGFyYW1ldGVycy5uYW1lLCAnZm9ybScpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJwdWJsaXNoRmlsZVwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBwdWJsaXNoRmlsZShwYXJhbWV0ZXJzKSB7XG4gICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICB2YXIgcGF0aCA9IFwiL3dlYmFwcHMvY21zbWFpbi93ZWJ1aS9jb3Vyc2VzL1wiICsgcGFyYW1ldGVycy5jb3Vyc2VJZCArIFwiP2FjdGlvbj11cGxvYWQmc3ViYWN0aW9uPXVwbG9hZEZpbGVzJnVuaXE9OXN6eGYzJmdvYmFja3RvPSUyRmNvdXJzZXMlMkZcIiArIHBhcmFtZXRlcnMuY291cnNlSWQ7XG4gICAgICAgIGNvbW1vbl8xLkhUVFBSZXF1ZXN0LmdldEFzeW5jKHBhdGgpLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgdmFyIHBhcnNlciA9IG5ldyBET01QYXJzZXIoKTtcbiAgICAgICAgICB2YXIgZG9tID0gcGFyc2VyLnBhcnNlRnJvbVN0cmluZyhyZXNwb25zZSwgJ3RleHQvaHRtbCcpO1xuICAgICAgICAgIHZhciBmb3JtID0gZG9tLmdldEVsZW1lbnRzQnlOYW1lKFwiZmlsZVVwbG9hZFwiKVswXTtcbiAgICAgICAgICB2YXIgZm9ybURhdGEgPSBuZXcgRm9ybURhdGEoKTtcbiAgICAgICAgICB2YXIgc2VjdXJpdHlOb25jZSA9IGNvbW1vbl8xLlV0aWxpdGllcy5nZXROb25jZUZyb21Gb3JtKGRvbSwgJ2ZpbGVVcGxvYWQnKTtcbiAgICAgICAgICBmb3JtRGF0YS5hcHBlbmQoJ2JsYWNrYm9hcmQucGxhdGZvcm0uc2VjdXJpdHkuTm9uY2VVdGlsLm5vbmNlJywgc2VjdXJpdHlOb25jZSk7XG4gICAgICAgICAgZm9ybURhdGEuYXBwZW5kKCd0YXJnZXRQYXRoJywgJy9jb3Vyc2VzLycgKyBwYXJhbWV0ZXJzLmNvdXJzZUlkKTtcbiAgICAgICAgICBmb3JtRGF0YS5hcHBlbmQoJ3ZpZXcnLCAnJyk7XG4gICAgICAgICAgZm9ybURhdGEuYXBwZW5kKCdpc0xpZ2h0Ym94JywgJ2ZhbHNlJyk7XG4gICAgICAgICAgZm9ybURhdGEuYXBwZW5kKCduZXdGaWxlX2F0dGFjaG1lbnRUeXBlJywgJ0wnKTtcbiAgICAgICAgICBmb3JtRGF0YS5hcHBlbmQoJ25ld0ZpbGVfYXJ0aWZhY3RGaWxlSWQnLCB1bmRlZmluZWQpO1xuICAgICAgICAgIGZvcm1EYXRhLmFwcGVuZCgnbmV3RmlsZV9hcnRpZmFjdFR5cGUnLCB1bmRlZmluZWQpO1xuICAgICAgICAgIGZvcm1EYXRhLmFwcGVuZCgnbmV3RmlsZV9hcnRpZmFjdFR5cGVSZXNvdXJjZUtleScsIHVuZGVmaW5lZCk7XG4gICAgICAgICAgZm9ybURhdGEuYXBwZW5kKCduZXdGaWxlX2xpbmtUaXRsZScsIHBhcmFtZXRlcnMubmFtZSk7XG4gICAgICAgICAgZm9ybURhdGEuYXBwZW5kKCd1cGRhdGVDb21tZW50VHlwZScsICd1cGRhdGVDb21tZW50VHlwZScpO1xuICAgICAgICAgIGZvcm1EYXRhLmFwcGVuZCgndXBkYXRlVmVyc2lvbnNTZXR0aW5nJywgJ3VwZGF0ZVZlcnNpb25zU2V0dGluZycpO1xuICAgICAgICAgIGZvcm1EYXRhLmFwcGVuZCgndXBkYXRlVHJhY2tpbmdTZXR0aW5nJywgJ3VwZGF0ZVRyYWNraW5nU2V0dGluZycpO1xuICAgICAgICAgIGZvcm1EYXRhLmFwcGVuZCgnbmV3RmlsZWZpbGVQaWNrZXJMYXN0SW5wdXQnLCAnZHVtbXlWYWx1ZScpO1xuICAgICAgICAgIGZvcm1EYXRhLmFwcGVuZCgnbmV3RmlsZV9Mb2NhbEZpbGUwJywgcGFyYW1ldGVycy5ib2R5KTtcbiAgICAgICAgICBjb21tb25fMS5IVFRQUmVxdWVzdC5wb3N0QXN5bmMoZm9ybS5hY3Rpb24gKyBcIiZjb3Vyc2VfaWQ9XCIgKyBwYXJhbWV0ZXJzLmlkLCBmb3JtRGF0YSk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImRlbGV0ZUZpbGVcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gZGVsZXRlRmlsZShwYXJhbWV0ZXJzKSB7XG4gICAgICByZXR1cm4gdGhpcy5maWxlQWN0aW9uKHBhcmFtZXRlcnMsICdtdWx0aXBsZScsICdkZWxldGUnKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiZG93bmxvYWRGaWxlXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGRvd25sb2FkRmlsZShwYXJhbWV0ZXJzKSB7XG4gICAgICByZXR1cm4gdGhpcy5maWxlQWN0aW9uKHBhcmFtZXRlcnMsICdkb3dubG9hZCcsICd6aXAnKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwic2V0UGVybWlzc2lvbnNcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gc2V0UGVybWlzc2lvbnMocGFyYW1ldGVycykge1xuICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgdmFyIHBhdGggPSBcIi93ZWJhcHBzL2Ntc21haW4vd2VidWkvY291cnNlcy9cIiArIHBhcmFtZXRlcnMuY291cnNlSWQgKyBcIi9cIiArIHBhcmFtZXRlcnMubmFtZSArIFwiP2FjdGlvbj1wZXJtaXNzaW9ucyZzdWJhY3Rpb249cHJpbnRmaW5kY291cnNldXNlcmxpc3QmdW5pcT11ejU3bzMmZ29iYWNrdG89ZGlyTGlzdC0mY291cnNlX2lkPVwiICsgcGFyYW1ldGVycy5pZDtcbiAgICAgICAgY29tbW9uXzEuSFRUUFJlcXVlc3QuZ2V0QXN5bmMocGF0aCkudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICB2YXIgcGFyc2VyID0gbmV3IERPTVBhcnNlcigpO1xuICAgICAgICAgIHZhciBkb20gPSBwYXJzZXIucGFyc2VGcm9tU3RyaW5nKHJlc3BvbnNlLCAndGV4dC9odG1sJyk7XG4gICAgICAgICAgdmFyIGZvcm0gPSBkb20uZ2V0RWxlbWVudHNCeU5hbWUoXCJhZGRVc2VyTGlzdEZvcm1cIilbMF07XG4gICAgICAgICAgdmFyIGZvcm1TdHJpbmcgPSAnJztcbiAgICAgICAgICB2YXIgc2VjdXJpdHlOb25jZSA9IGNvbW1vbl8xLlV0aWxpdGllcy5nZXROb25jZUZyb21Gb3JtKGRvbSwgJ2FkZFVzZXJMaXN0Rm9ybScpO1xuICAgICAgICAgIGZvcm1TdHJpbmcgKz0gJ2JsYWNrYm9hcmQucGxhdGZvcm0uc2VjdXJpdHkuTm9uY2VVdGlsLm5vbmNlPScgKyBzZWN1cml0eU5vbmNlO1xuICAgICAgICAgIGZvcm1TdHJpbmcgKz0gJyZjb3Vyc2VfaWRzPScgKyBwYXJhbWV0ZXJzLmNvdXJzZUlkO1xuICAgICAgICAgIGZvcm1TdHJpbmcgKz0gJyZiQWxsb3dFdmVyeW9uZT0nICsgcGFyYW1ldGVycy5iQWxsb3dFdmVyeW9uZTtcbiAgICAgICAgICBmb3JtU3RyaW5nICs9ICcmQj0nICsgcGFyYW1ldGVycy5CO1xuICAgICAgICAgIGZvcm1TdHJpbmcgKz0gJyZHPScgKyBwYXJhbWV0ZXJzLkc7XG4gICAgICAgICAgZm9ybVN0cmluZyArPSAnJlA9JyArIHBhcmFtZXRlcnMuUDtcbiAgICAgICAgICBmb3JtU3RyaW5nICs9ICcmUz0nICsgcGFyYW1ldGVycy5TO1xuICAgICAgICAgIGZvcm1TdHJpbmcgKz0gJyZUPScgKyBwYXJhbWV0ZXJzLlQ7XG4gICAgICAgICAgZm9ybVN0cmluZyArPSAnJlU9JyArIHBhcmFtZXRlcnMuVTtcbiAgICAgICAgICBmb3JtU3RyaW5nICs9ICcmYkFsbG93UmVhZD0nICsgcGFyYW1ldGVycy5iQWxsb3dSZWFkO1xuICAgICAgICAgIGZvcm1TdHJpbmcgKz0gJyZiQWxsb3dXcml0ZT0nICsgcGFyYW1ldGVycy5iQWxsb3dXcml0ZTtcbiAgICAgICAgICBmb3JtU3RyaW5nICs9ICcmYkFsbG93RGVsZXRlPScgKyBwYXJhbWV0ZXJzLmJBbGxvd0RlbGV0ZTtcbiAgICAgICAgICBmb3JtU3RyaW5nICs9ICcmYkFsbG93TWFuYWdlPScgKyBwYXJhbWV0ZXJzLmJBbGxvd01hbmFnZTtcbiAgICAgICAgICBmb3JtU3RyaW5nICs9ICcmYm90dG9tX1N1Ym1pdD0nICsgJ1N1Ym1pdCc7XG4gICAgICAgICAgY29tbW9uXzEuSFRUUFJlcXVlc3QucG9zdEFzeW5jKGZvcm0uYWN0aW9uLCBmb3JtU3RyaW5nLCAnZm9ybScpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJ1cGxvYWRGaWxlXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHVwbG9hZEZpbGUocGFyYW1ldGVycykge1xuICAgICAgdmFyIHBhdGggPSBcIi9sZWFybi9hcGkvcHVibGljL3YxL3VwbG9hZHNcIjtcbiAgICAgIHZhciBmb3JtRGF0YSA9IG5ldyBGb3JtRGF0YSgpO1xuICAgICAgZm9ybURhdGEuYXBwZW5kKCdmaWxlJywgcGFyYW1ldGVycy5maWxlKTtcbiAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGNvbW1vbl8xLkhUVFBSZXF1ZXN0LnBvc3RBc3luYyhwYXRoLCBmb3JtRGF0YSkudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICB2YXIgaWQgPSBKU09OLnBhcnNlKHJlc3BvbnNlKTtcbiAgICAgICAgICB2YXIgcmVzdWx0ID0ge1xuICAgICAgICAgICAgaWQ6IGlkLmlkXG4gICAgICAgICAgfTtcbiAgICAgICAgICByZXNvbHZlKHJlc3VsdCk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfVxuICB9XSk7XG5cbiAgcmV0dXJuIEJCRmlsZXM7XG59KGZpbGVzXzFbXCJkZWZhdWx0XCJdKTtcblxuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBCQkZpbGVzOyIsIlwidXNlIHN0cmljdFwiO1xuXG5mdW5jdGlvbiBfdHlwZW9mKG9iaikgeyBpZiAodHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgPT09IFwic3ltYm9sXCIpIHsgX3R5cGVvZiA9IGZ1bmN0aW9uIF90eXBlb2Yob2JqKSB7IHJldHVybiB0eXBlb2Ygb2JqOyB9OyB9IGVsc2UgeyBfdHlwZW9mID0gZnVuY3Rpb24gX3R5cGVvZihvYmopIHsgcmV0dXJuIG9iaiAmJiB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb2JqLmNvbnN0cnVjdG9yID09PSBTeW1ib2wgJiYgb2JqICE9PSBTeW1ib2wucHJvdG90eXBlID8gXCJzeW1ib2xcIiA6IHR5cGVvZiBvYmo7IH07IH0gcmV0dXJuIF90eXBlb2Yob2JqKTsgfVxuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG5mdW5jdGlvbiBfZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7IGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHsgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTsgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlOyBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7IGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTsgfSB9XG5cbmZ1bmN0aW9uIF9jcmVhdGVDbGFzcyhDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHsgaWYgKHByb3RvUHJvcHMpIF9kZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7IGlmIChzdGF0aWNQcm9wcykgX2RlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTsgcmV0dXJuIENvbnN0cnVjdG9yOyB9XG5cbmZ1bmN0aW9uIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHNlbGYsIGNhbGwpIHsgaWYgKGNhbGwgJiYgKF90eXBlb2YoY2FsbCkgPT09IFwib2JqZWN0XCIgfHwgdHlwZW9mIGNhbGwgPT09IFwiZnVuY3Rpb25cIikpIHsgcmV0dXJuIGNhbGw7IH0gcmV0dXJuIF9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQoc2VsZik7IH1cblxuZnVuY3Rpb24gX2Fzc2VydFRoaXNJbml0aWFsaXplZChzZWxmKSB7IGlmIChzZWxmID09PSB2b2lkIDApIHsgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKFwidGhpcyBoYXNuJ3QgYmVlbiBpbml0aWFsaXNlZCAtIHN1cGVyKCkgaGFzbid0IGJlZW4gY2FsbGVkXCIpOyB9IHJldHVybiBzZWxmOyB9XG5cbmZ1bmN0aW9uIF9nZXRQcm90b3R5cGVPZihvKSB7IF9nZXRQcm90b3R5cGVPZiA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiA/IE9iamVjdC5nZXRQcm90b3R5cGVPZiA6IGZ1bmN0aW9uIF9nZXRQcm90b3R5cGVPZihvKSB7IHJldHVybiBvLl9fcHJvdG9fXyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2Yobyk7IH07IHJldHVybiBfZ2V0UHJvdG90eXBlT2Yobyk7IH1cblxuZnVuY3Rpb24gX2luaGVyaXRzKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7IGlmICh0eXBlb2Ygc3VwZXJDbGFzcyAhPT0gXCJmdW5jdGlvblwiICYmIHN1cGVyQ2xhc3MgIT09IG51bGwpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN1cGVyIGV4cHJlc3Npb24gbXVzdCBlaXRoZXIgYmUgbnVsbCBvciBhIGZ1bmN0aW9uXCIpOyB9IHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcyAmJiBzdXBlckNsYXNzLnByb3RvdHlwZSwgeyBjb25zdHJ1Y3RvcjogeyB2YWx1ZTogc3ViQ2xhc3MsIHdyaXRhYmxlOiB0cnVlLCBjb25maWd1cmFibGU6IHRydWUgfSB9KTsgaWYgKHN1cGVyQ2xhc3MpIF9zZXRQcm90b3R5cGVPZihzdWJDbGFzcywgc3VwZXJDbGFzcyk7IH1cblxuZnVuY3Rpb24gX3NldFByb3RvdHlwZU9mKG8sIHApIHsgX3NldFByb3RvdHlwZU9mID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8IGZ1bmN0aW9uIF9zZXRQcm90b3R5cGVPZihvLCBwKSB7IG8uX19wcm90b19fID0gcDsgcmV0dXJuIG87IH07IHJldHVybiBfc2V0UHJvdG90eXBlT2YobywgcCk7IH1cblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIGNvbW1vbl8xID0gcmVxdWlyZShcIi4uLy4uL2NvbW1vblwiKTtcblxudmFyIGdyYWRlQ29sdW1uc18xID0gcmVxdWlyZShcIi4uLy4uL2NvbW1vbi9CQkFic3RyYWN0QmFja2VuZC9ncmFkZUNvbHVtbnNcIik7XG5cbnZhciBCQkdyYWRlQ29sdW1ucyA9XG4vKiNfX1BVUkVfXyovXG5mdW5jdGlvbiAoX2dyYWRlQ29sdW1uc18xJGRlZmF1KSB7XG4gIF9pbmhlcml0cyhCQkdyYWRlQ29sdW1ucywgX2dyYWRlQ29sdW1uc18xJGRlZmF1KTtcblxuICBmdW5jdGlvbiBCQkdyYWRlQ29sdW1ucygpIHtcbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgQkJHcmFkZUNvbHVtbnMpO1xuXG4gICAgcmV0dXJuIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHRoaXMsIF9nZXRQcm90b3R5cGVPZihCQkdyYWRlQ29sdW1ucykuYXBwbHkodGhpcywgYXJndW1lbnRzKSk7XG4gIH1cblxuICBfY3JlYXRlQ2xhc3MoQkJHcmFkZUNvbHVtbnMsIFt7XG4gICAga2V5OiBcImdldEFzc2lnbm1lbnRDb2xcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gZ2V0QXNzaWdubWVudENvbChwYXJhbWV0ZXJzKSB7XG4gICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgICB2YXIgcGF0aCA9IFwiL2xlYXJuL2FwaS9wdWJsaWMvdjIvY291cnNlcy9cIiArIHBhcmFtZXRlcnMuY291cnNlSWQgKyBcIi9ncmFkZWJvb2svY29sdW1ucy9cIiArIHBhcmFtZXRlcnMuY29sdW1uSWQ7XG4gICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBjb21tb25fMS5IVFRQUmVxdWVzdC5nZXRBc3luYyhwYXRoKS50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgIHZhciBjb2x1bW4gPSBKU09OLnBhcnNlKHJlc3BvbnNlKTtcblxuICAgICAgICAgIHZhciByZXN1bHQgPSBfdGhpcy5jcmVhdGVJQXNzaWdubWVudChjb2x1bW4pO1xuXG4gICAgICAgICAgcmVzb2x2ZShyZXN1bHQpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJkZWxldGVBc3NpZ25tZW50Q29sXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGRlbGV0ZUFzc2lnbm1lbnRDb2wocGFyYW1ldGVycykge1xuICAgICAgdmFyIHBhdGggPSBcIi93ZWJhcHBzL2dyYWRlYm9vay9kby9pbnN0cnVjdG9yL2RlbGV0ZUl0ZW0/Y291cnNlX2lkPVwiICsgcGFyYW1ldGVycy5jb3Vyc2VJZDtcbiAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGNvbW1vbl8xLlV0aWxpdGllcy5nZXROb25jZUZyb21Db3Vyc2VJZChwYXJhbWV0ZXJzLmNvdXJzZUlkKS50aGVuKGZ1bmN0aW9uIChub25jZSkge1xuICAgICAgICAgIHZhciBmb3JtRGF0YSA9IG5ldyBGb3JtRGF0YSgpO1xuICAgICAgICAgIGZvcm1EYXRhLmFwcGVuZCgnaXRlbUlkJywgcGFyYW1ldGVycy5jb2x1bW5JZCk7XG4gICAgICAgICAgZm9ybURhdGEuYXBwZW5kKCdibGFja2JvYXJkLnBsYXRmb3JtLnNlY3VyaXR5Lk5vbmNlVXRpbC5ub25jZScsIG5vbmNlKTtcbiAgICAgICAgICBjb21tb25fMS5IVFRQUmVxdWVzdC5wb3N0QXN5bmMocGF0aCwgZm9ybURhdGEpLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICB2YXIgcmVzdWx0ID0ge1xuICAgICAgICAgICAgICBzdWNjZXNzOiB0cnVlXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgcmVzb2x2ZShyZXN1bHQpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJjcmVhdGVBc3NpZ25tZW50QXR0ZW1wdFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBjcmVhdGVBc3NpZ25tZW50QXR0ZW1wdChwYXJhbWV0ZXJzKSB7XG4gICAgICB2YXIgX3RoaXMyID0gdGhpcztcblxuICAgICAgdmFyIHBhdGggPSBcIi9sZWFybi9hcGkvcHVibGljL3YyL2NvdXJzZXMvXCIgKyBwYXJhbWV0ZXJzLmNvdXJzZUlkICsgXCIvZ3JhZGVib29rL2NvbHVtbnMvXCIgKyBwYXJhbWV0ZXJzLmNvbHVtbklkICsgXCIvYXR0ZW1wdHNcIjtcbiAgICAgIHZhciBmb3JtRGF0YSA9IG5ldyBGb3JtRGF0YSgpO1xuICAgICAgZm9ybURhdGEuYXBwZW5kKCdhdHRlbXB0SW5wdXQnLCBwYXJhbWV0ZXJzLmF0dGVtcHRJbnB1dCk7XG4gICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBjb21tb25fMS5IVFRQUmVxdWVzdC5wb3N0QXN5bmMocGF0aCwgZm9ybURhdGEpLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgdmFyIGF0dGVtcHQgPSBKU09OLnBhcnNlKHJlc3BvbnNlKTtcblxuICAgICAgICAgIHZhciByZXN1bHQgPSBfdGhpczIuY3JlYXRlSUFzc2lnbm1lbnRBdHRlbXB0KGF0dGVtcHQpO1xuXG4gICAgICAgICAgcmVzb2x2ZShyZXN1bHQpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJ1cGRhdGVBc3NpZ25tZW50QXR0ZW1wdFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiB1cGRhdGVBc3NpZ25tZW50QXR0ZW1wdChwYXJhbWV0ZXJzKSB7XG4gICAgICB2YXIgX3RoaXMzID0gdGhpcztcblxuICAgICAgdmFyIHBhdGggPSBcIi9sZWFybi9hcGkvcHVibGljL3YyL2NvdXJzZXMvXCIgKyBwYXJhbWV0ZXJzLmNvdXJzZUlkICsgXCIvZ3JhZGVib29rL2NvbHVtbnMvXCIgKyBwYXJhbWV0ZXJzLmNvbHVtbklkICsgXCIvYXR0ZW1wdHMvXCIgKyBwYXJhbWV0ZXJzLmF0dGVtcHRJZDtcbiAgICAgIHZhciBmb3JtRGF0YSA9IG5ldyBGb3JtRGF0YSgpO1xuICAgICAgZm9ybURhdGEuYXBwZW5kKCdhdHRlbXB0SW5wdXQnLCBwYXJhbWV0ZXJzLmF0dGVtcHRJbnB1dCk7XG4gICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBjb21tb25fMS5IVFRQUmVxdWVzdC5wb3N0QXN5bmMocGF0aCwgZm9ybURhdGEpLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgdmFyIGF0dGVtcHQgPSBKU09OLnBhcnNlKHJlc3BvbnNlKTtcblxuICAgICAgICAgIHZhciByZXN1bHQgPSBfdGhpczMuY3JlYXRlSUFzc2lnbm1lbnRBdHRlbXB0KGF0dGVtcHQpO1xuXG4gICAgICAgICAgcmVzb2x2ZShyZXN1bHQpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJnZXRBc3NpZ25tZW50QXR0ZW1wdFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBnZXRBc3NpZ25tZW50QXR0ZW1wdChwYXJhbWV0ZXJzKSB7XG4gICAgICB2YXIgX3RoaXM0ID0gdGhpcztcblxuICAgICAgdmFyIHBhdGggPSBcIi9sZWFybi9hcGkvcHVibGljL3YyL2NvdXJzZXMvXCIgKyBwYXJhbWV0ZXJzLmNvdXJzZUlkICsgXCIvZ3JhZGVib29rL2NvbHVtbnMvXCIgKyBwYXJhbWV0ZXJzLmNvbHVtbklkICsgXCIvYXR0ZW1wdHMvXCIgKyBwYXJhbWV0ZXJzLmF0dGVtcHRJZDtcbiAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGNvbW1vbl8xLkhUVFBSZXF1ZXN0LmdldEFzeW5jKHBhdGgpLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgdmFyIGF0dGVtcHQgPSBKU09OLnBhcnNlKHJlc3BvbnNlKTtcblxuICAgICAgICAgIHZhciByZXN1bHQgPSBfdGhpczQuY3JlYXRlSUFzc2lnbm1lbnRBdHRlbXB0KGF0dGVtcHQpO1xuXG4gICAgICAgICAgcmVzb2x2ZShyZXN1bHQpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJnZXRBc3NpZ25tZW50QXR0ZW1wdHNcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gZ2V0QXNzaWdubWVudEF0dGVtcHRzKHBhcmFtZXRlcnMpIHtcbiAgICAgIHZhciBfdGhpczUgPSB0aGlzO1xuXG4gICAgICB2YXIgcGF0aCA9IFwiL2xlYXJuL2FwaS9wdWJsaWMvdjIvY291cnNlcy9cIiArIHBhcmFtZXRlcnMuY291cnNlSWQgKyBcIi9ncmFkZWJvb2svY29sdW1ucy9cIiArIHBhcmFtZXRlcnMuY29sdW1uSWQgKyBcIi9hdHRlbXB0c1wiO1xuICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgY29tbW9uXzEuSFRUUFJlcXVlc3QuZ2V0QXN5bmMocGF0aCkudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICB2YXIgYXR0ZW1wdHMgPSBKU09OLnBhcnNlKHJlc3BvbnNlKS5yZXN1bHRzO1xuICAgICAgICAgIHZhciByZXN1bHQgPSBbXTtcbiAgICAgICAgICB2YXIgX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbiA9IHRydWU7XG4gICAgICAgICAgdmFyIF9kaWRJdGVyYXRvckVycm9yID0gZmFsc2U7XG4gICAgICAgICAgdmFyIF9pdGVyYXRvckVycm9yID0gdW5kZWZpbmVkO1xuXG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGZvciAodmFyIF9pdGVyYXRvciA9IGF0dGVtcHRzW1N5bWJvbC5pdGVyYXRvcl0oKSwgX3N0ZXA7ICEoX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbiA9IChfc3RlcCA9IF9pdGVyYXRvci5uZXh0KCkpLmRvbmUpOyBfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uID0gdHJ1ZSkge1xuICAgICAgICAgICAgICB2YXIgYXR0ZW1wdCA9IF9zdGVwLnZhbHVlO1xuICAgICAgICAgICAgICByZXN1bHQucHVzaChfdGhpczUuY3JlYXRlSUFzc2lnbm1lbnRBdHRlbXB0KGF0dGVtcHQpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIF9kaWRJdGVyYXRvckVycm9yID0gdHJ1ZTtcbiAgICAgICAgICAgIF9pdGVyYXRvckVycm9yID0gZXJyO1xuICAgICAgICAgIH0gZmluYWxseSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICBpZiAoIV9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24gJiYgX2l0ZXJhdG9yW1wicmV0dXJuXCJdICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICBfaXRlcmF0b3JbXCJyZXR1cm5cIl0oKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgICAgICAgaWYgKF9kaWRJdGVyYXRvckVycm9yKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgX2l0ZXJhdG9yRXJyb3I7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXNvbHZlKHJlc3VsdCk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImdldEZpbGVzRnJvbUFzc2lnbm1lbnRBdHRlbXB0XCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGdldEZpbGVzRnJvbUFzc2lnbm1lbnRBdHRlbXB0KHBhcmFtZXRlcnMpIHtcbiAgICAgIHZhciBfdGhpczYgPSB0aGlzO1xuXG4gICAgICB2YXIgcGF0aCA9IFwiL2xlYXJuL2FwaS9wdWJsaWMvdjEvY291cnNlcy9cIiArIHBhcmFtZXRlcnMuY291cnNlSWQgKyBcIi9ncmFkZWJvb2svYXR0ZW1wdHMvXCIgKyBwYXJhbWV0ZXJzLmF0dGVtcHRJZCArIFwiL2ZpbGVzXCI7XG4gICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBjb21tb25fMS5IVFRQUmVxdWVzdC5nZXRBc3luYyhwYXRoKS50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgIHZhciBmaWxlcyA9IEpTT04ucGFyc2UocmVzcG9uc2UpLnJlc3VsdHM7XG4gICAgICAgICAgdmFyIHJlc3VsdCA9IFtdO1xuICAgICAgICAgIHZhciBfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uMiA9IHRydWU7XG4gICAgICAgICAgdmFyIF9kaWRJdGVyYXRvckVycm9yMiA9IGZhbHNlO1xuICAgICAgICAgIHZhciBfaXRlcmF0b3JFcnJvcjIgPSB1bmRlZmluZWQ7XG5cbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgZm9yICh2YXIgX2l0ZXJhdG9yMiA9IGZpbGVzW1N5bWJvbC5pdGVyYXRvcl0oKSwgX3N0ZXAyOyAhKF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24yID0gKF9zdGVwMiA9IF9pdGVyYXRvcjIubmV4dCgpKS5kb25lKTsgX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjIgPSB0cnVlKSB7XG4gICAgICAgICAgICAgIHZhciBmaWxlID0gX3N0ZXAyLnZhbHVlO1xuICAgICAgICAgICAgICByZXN1bHQucHVzaChfdGhpczYuY3JlYXRlSUFzc2lnbm1lbnRBdHRlbXB0RmlsZShmaWxlKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICBfZGlkSXRlcmF0b3JFcnJvcjIgPSB0cnVlO1xuICAgICAgICAgICAgX2l0ZXJhdG9yRXJyb3IyID0gZXJyO1xuICAgICAgICAgIH0gZmluYWxseSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICBpZiAoIV9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24yICYmIF9pdGVyYXRvcjJbXCJyZXR1cm5cIl0gIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIF9pdGVyYXRvcjJbXCJyZXR1cm5cIl0oKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgICAgICAgaWYgKF9kaWRJdGVyYXRvckVycm9yMikge1xuICAgICAgICAgICAgICAgIHRocm93IF9pdGVyYXRvckVycm9yMjtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIHJlc29sdmUocmVzdWx0KTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiZGVsZXRlRmlsZUZyb21Bc3NpZ25tZW50QXR0ZW1wdFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBkZWxldGVGaWxlRnJvbUFzc2lnbm1lbnRBdHRlbXB0KHBhcmFtZXRlcnMpIHtcbiAgICAgIHZhciBwYXRoID0gXCIvbGVhcm4vYXBpL3B1YmxpYy92MS9jb3Vyc2VzL1wiICsgcGFyYW1ldGVycy5jb3Vyc2VJZCArIFwiL2dyYWRlYm9vay9hdHRlbXB0cy9cIiArIHBhcmFtZXRlcnMuYXR0ZW1wdElkICsgXCIvZmlsZXMvXCIgKyBwYXJhbWV0ZXJzLmF0dGVtcHRGaWxlSWQ7XG4gICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBjb21tb25fMS5IVFRQUmVxdWVzdC5kZWxldGVBc3luYyhwYXRoKS50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgIHZhciByZXN1bHQgPSB7XG4gICAgICAgICAgICBzdWNjZXNzOiB0cnVlXG4gICAgICAgICAgfTtcbiAgICAgICAgICByZXNvbHZlKHJlc3VsdCk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImdldEZpbGVGcm9tQXNzaWdubWVudEF0dGVtcHRcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gZ2V0RmlsZUZyb21Bc3NpZ25tZW50QXR0ZW1wdChwYXJhbWV0ZXJzKSB7XG4gICAgICB2YXIgX3RoaXM3ID0gdGhpcztcblxuICAgICAgdmFyIHBhdGggPSBcIi9sZWFybi9hcGkvcHVibGljL3YxL2NvdXJzZXMvXCIgKyBwYXJhbWV0ZXJzLmNvdXJzZUlkICsgXCIvZ3JhZGVib29rL2F0dGVtcHRzL1wiICsgcGFyYW1ldGVycy5hdHRlbXB0SWQgKyBcIi9maWxlcy9cIiArIHBhcmFtZXRlcnMuYXR0ZW1wdEZpbGVJZDtcbiAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGNvbW1vbl8xLkhUVFBSZXF1ZXN0LmdldEFzeW5jKHBhdGgpLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgdmFyIGZpbGUgPSBKU09OLnBhcnNlKHJlc3BvbnNlKTtcblxuICAgICAgICAgIHZhciByZXN1bHQgPSBfdGhpczcuY3JlYXRlSUFzc2lnbm1lbnRBdHRlbXB0RmlsZShmaWxlKTtcblxuICAgICAgICAgIHJlc29sdmUocmVzdWx0KTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiZG93bmxvYWRGaWxlRnJvbUFzc2lnbm1lbnRBdHRlbXB0XCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGRvd25sb2FkRmlsZUZyb21Bc3NpZ25tZW50QXR0ZW1wdChwYXJhbWV0ZXJzKSB7XG4gICAgICB2YXIgX3RoaXM4ID0gdGhpcztcblxuICAgICAgdmFyIHBhdGggPSBcIi9sZWFybi9hcGkvcHVibGljL3YxL2NvdXJzZXMvXCIgKyBwYXJhbWV0ZXJzLmNvdXJzZUlkICsgXCIvZ3JhZGVib29rL2F0dGVtcHRzL1wiICsgcGFyYW1ldGVycy5hdHRlbXB0SWQgKyBcIi9maWxlcy9cIiArIHBhcmFtZXRlcnMuYXR0ZW1wdEZpbGVJZCArIFwiL2Rvd25sb2FkXCI7XG4gICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBQcm9taXNlLmFsbChbX3RoaXM4LmdldEZpbGVGcm9tQXNzaWdubWVudEF0dGVtcHQocGFyYW1ldGVycyksIGNvbW1vbl8xLkhUVFBSZXF1ZXN0LmRvd25sb2FkQXN5bmMocGF0aCldKS50aGVuKGZ1bmN0aW9uIChyZXNwb25zZXMpIHtcbiAgICAgICAgICB2YXIgZmlsZUluZm8gPSByZXNwb25zZXNbMF07XG4gICAgICAgICAgdmFyIGJsb2IgPSByZXNwb25zZXNbMV07XG4gICAgICAgICAgdmFyIGZpbGUgPSBuZXcgRmlsZShbYmxvYl0sIGZpbGVJbmZvLm5hbWUpO1xuICAgICAgICAgIHJlc29sdmUoZmlsZSk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImFkZEZpbGVUb0Fzc2lnbm1lbnRBdHRlbXB0XCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGFkZEZpbGVUb0Fzc2lnbm1lbnRBdHRlbXB0KHBhcmFtZXRlcnMpIHtcbiAgICAgIHZhciBfdGhpczkgPSB0aGlzO1xuXG4gICAgICB2YXIgcGF0aCA9IFwiL2xlYXJuL2FwaS9wdWJsaWMvdjEvY291cnNlcy9cIiArIHBhcmFtZXRlcnMuY291cnNlSWQgKyBcIi9ncmFkZWJvb2svYXR0ZW1wdHMvXCIgKyBwYXJhbWV0ZXJzLmF0dGVtcHRJZCArIFwiL2ZpbGVzXCI7XG4gICAgICB2YXIgZm9ybURhdGEgPSBuZXcgRm9ybURhdGEoKTtcbiAgICAgIGZvcm1EYXRhLmFwcGVuZCgnYXR0ZW1wdEZpbGVUT1B1YlYxJywgcGFyYW1ldGVycy5maWxlSWQpO1xuICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgY29tbW9uXzEuSFRUUFJlcXVlc3QucG9zdEFzeW5jKHBhdGgsIGZvcm1EYXRhKS50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgIHZhciBmaWxlID0gSlNPTi5wYXJzZShyZXNwb25zZSk7XG5cbiAgICAgICAgICB2YXIgcmVzdWx0ID0gX3RoaXM5LmNyZWF0ZUlBc3NpZ25tZW50QXR0ZW1wdEZpbGUoZmlsZSk7XG5cbiAgICAgICAgICByZXNvbHZlKHJlc3VsdCk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImdldFVzZXJHcmFkZXNcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gZ2V0VXNlckdyYWRlcyhwYXJhbWV0ZXJzKSB7XG4gICAgICB2YXIgcGF0aCA9IFwiL2xlYXJuL2FwaS9wdWJsaWMvdjIvY291cnNlcy9cIiArIHBhcmFtZXRlcnMuY291cnNlSWQgKyBcIi9ncmFkZWJvb2svdXNlcnMvXCIgKyBwYXJhbWV0ZXJzLnVzZXJJZDtcbiAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGNvbW1vbl8xLkhUVFBSZXF1ZXN0LmdldEFzeW5jKHBhdGgpLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgdmFyIHJlc3VsdHMgPSBKU09OLnBhcnNlKHJlc3BvbnNlKS5yZXN1bHRzO1xuICAgICAgICAgIHZhciBncmFkZXMgPSBbXTtcbiAgICAgICAgICB2YXIgX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjMgPSB0cnVlO1xuICAgICAgICAgIHZhciBfZGlkSXRlcmF0b3JFcnJvcjMgPSBmYWxzZTtcbiAgICAgICAgICB2YXIgX2l0ZXJhdG9yRXJyb3IzID0gdW5kZWZpbmVkO1xuXG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGZvciAodmFyIF9pdGVyYXRvcjMgPSByZXN1bHRzW1N5bWJvbC5pdGVyYXRvcl0oKSwgX3N0ZXAzOyAhKF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24zID0gKF9zdGVwMyA9IF9pdGVyYXRvcjMubmV4dCgpKS5kb25lKTsgX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjMgPSB0cnVlKSB7XG4gICAgICAgICAgICAgIHZhciByZXN1bHQgPSBfc3RlcDMudmFsdWU7XG4gICAgICAgICAgICAgIGdyYWRlcy5wdXNoKHtcbiAgICAgICAgICAgICAgICBjb2x1bW5JZDogcmVzdWx0LmNvbHVtbklkLFxuICAgICAgICAgICAgICAgIGZlZWRiYWNrOiByZXN1bHQuZmVlZGJhY2ssXG4gICAgICAgICAgICAgICAgbm90ZXM6IHJlc3VsdC5ub3RlcyxcbiAgICAgICAgICAgICAgICBzY29yZTogcmVzdWx0LnNjb3JlLFxuICAgICAgICAgICAgICAgIHRleHQ6IHJlc3VsdC50ZXh0XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgX2RpZEl0ZXJhdG9yRXJyb3IzID0gdHJ1ZTtcbiAgICAgICAgICAgIF9pdGVyYXRvckVycm9yMyA9IGVycjtcbiAgICAgICAgICB9IGZpbmFsbHkge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgaWYgKCFfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uMyAmJiBfaXRlcmF0b3IzW1wicmV0dXJuXCJdICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICBfaXRlcmF0b3IzW1wicmV0dXJuXCJdKCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZmluYWxseSB7XG4gICAgICAgICAgICAgIGlmIChfZGlkSXRlcmF0b3JFcnJvcjMpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBfaXRlcmF0b3JFcnJvcjM7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXNvbHZlKGdyYWRlcyk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImNyZWF0ZUlBc3NpZ25tZW50QXR0ZW1wdEZpbGVcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gY3JlYXRlSUFzc2lnbm1lbnRBdHRlbXB0RmlsZShpbmZvcm1hdGlvbikge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgaWQ6IGluZm9ybWF0aW9uLmlkLFxuICAgICAgICBuYW1lOiBpbmZvcm1hdGlvbi5uYW1lLFxuICAgICAgICB1cmw6IGluZm9ybWF0aW9uLnZpZXdVcmxcbiAgICAgIH07XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImNyZWF0ZUlBc3NpZ25tZW50QXR0ZW1wdFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBjcmVhdGVJQXNzaWdubWVudEF0dGVtcHQoaW5mb3JtYXRpb24pIHtcbiAgICAgIHZhciBzY29yZSA9IHR5cGVvZiBpbmZvcm1hdGlvbi5kaXNwbGF5R3JhZGUgIT09IFwidW5kZWZpbmVkXCIgPyBpbmZvcm1hdGlvbi5kaXNwbGF5R3JhZGUuc2NvcmUgOiBpbmZvcm1hdGlvbi5zY29yZTtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGNyZWF0ZWQ6IGluZm9ybWF0aW9uLmNyZWF0ZWQsXG4gICAgICAgIGZlZWRiYWNrOiBpbmZvcm1hdGlvbi5mZWVkYmFjayxcbiAgICAgICAgZ3JvdXBBdHRlbXB0SWQ6IGluZm9ybWF0aW9uLmdyb3VwQXR0ZW1wdElkLFxuICAgICAgICBpZDogaW5mb3JtYXRpb24uaWQsXG4gICAgICAgIG5vdGVzOiBpbmZvcm1hdGlvbi5ub3RlcyxcbiAgICAgICAgc2NvcmU6IHNjb3JlLFxuICAgICAgICBzdGF0dXM6IGluZm9ybWF0aW9uLnN0YXR1cyxcbiAgICAgICAgc3R1ZGVudENvbW1lbnRzOiBpbmZvcm1hdGlvbi5zdHVkZW50Q29tbWVudHMsXG4gICAgICAgIHN0dWRlbnRTdWJtaXNzaW9uOiBpbmZvcm1hdGlvbi5zdHVkZW50U3VibWlzc2lvbixcbiAgICAgICAgdGV4dDogaW5mb3JtYXRpb24udGV4dCxcbiAgICAgICAgdXNlcklkOiBpbmZvcm1hdGlvbi51c2VySWRcbiAgICAgIH07XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImNyZWF0ZUlBc3NpZ25tZW50XCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGNyZWF0ZUlBc3NpZ25tZW50KGluZm9ybWF0aW9uKSB7XG4gICAgICBpZiAodHlwZW9mIGluZm9ybWF0aW9uLmF2YWlsYWJpbGl0eSAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIGF0dGVtcHRzQWxsb3dlZDogaW5mb3JtYXRpb24uZ3JhZGluZy5hdHRlbXB0c0FsbG93ZWQsXG4gICAgICAgICAgYXZhaWxhYmxlOiBjb21tb25fMS5VdGlsaXRpZXMuc3RyaW5nVG9Cb29sZWFuKGluZm9ybWF0aW9uLmF2YWlsYWJpbGl0eS5hdmFpbGFibGUpLFxuICAgICAgICAgIGNvbnRlbnRJZDogaW5mb3JtYXRpb24uY29udGVudElkLFxuICAgICAgICAgIGRlc2M6IGluZm9ybWF0aW9uLmRlc2NyaXB0aW9uLFxuICAgICAgICAgIGR1ZTogaW5mb3JtYXRpb24uZ3JhZGluZy5kdWUsXG4gICAgICAgICAgaWQ6IGluZm9ybWF0aW9uLmlkLFxuICAgICAgICAgIG5hbWU6IGluZm9ybWF0aW9uLm5hbWUsXG4gICAgICAgICAgc2NvcmU6IGluZm9ybWF0aW9uLnNjb3JlLnBvc3NpYmxlXG4gICAgICAgIH07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIGF0dGVtcHRzQWxsb3dlZDogaW5mb3JtYXRpb24uZ3JhZGluZy5hdHRlbXB0c0FsbG93ZWQsXG4gICAgICAgICAgYXZhaWxhYmxlOiB0cnVlLFxuICAgICAgICAgIGNvbnRlbnRJZDogaW5mb3JtYXRpb24uY29udGVudElkLFxuICAgICAgICAgIGRlc2M6IFwiXCIsXG4gICAgICAgICAgZHVlOiBpbmZvcm1hdGlvbi5ncmFkaW5nLmR1ZSxcbiAgICAgICAgICBpZDogaW5mb3JtYXRpb24uaWQsXG4gICAgICAgICAgbmFtZTogaW5mb3JtYXRpb24ubmFtZSxcbiAgICAgICAgICBzY29yZTogaW5mb3JtYXRpb24uc2NvcmUucG9zc2libGVcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9XG4gIH1dKTtcblxuICByZXR1cm4gQkJHcmFkZUNvbHVtbnM7XG59KGdyYWRlQ29sdW1uc18xW1wiZGVmYXVsdFwiXSk7XG5cbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gQkJHcmFkZUNvbHVtbnM7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmZ1bmN0aW9uIF90eXBlb2Yob2JqKSB7IGlmICh0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgdHlwZW9mIFN5bWJvbC5pdGVyYXRvciA9PT0gXCJzeW1ib2xcIikgeyBfdHlwZW9mID0gZnVuY3Rpb24gX3R5cGVvZihvYmopIHsgcmV0dXJuIHR5cGVvZiBvYmo7IH07IH0gZWxzZSB7IF90eXBlb2YgPSBmdW5jdGlvbiBfdHlwZW9mKG9iaikgeyByZXR1cm4gb2JqICYmIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvYmouY29uc3RydWN0b3IgPT09IFN5bWJvbCAmJiBvYmogIT09IFN5bWJvbC5wcm90b3R5cGUgPyBcInN5bWJvbFwiIDogdHlwZW9mIG9iajsgfTsgfSByZXR1cm4gX3R5cGVvZihvYmopOyB9XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5cbmZ1bmN0aW9uIF9kZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHsgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykgeyB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldOyBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7IGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTsgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpOyB9IH1cblxuZnVuY3Rpb24gX2NyZWF0ZUNsYXNzKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykgeyBpZiAocHJvdG9Qcm9wcykgX2RlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTsgaWYgKHN0YXRpY1Byb3BzKSBfZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpOyByZXR1cm4gQ29uc3RydWN0b3I7IH1cblxuZnVuY3Rpb24gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4oc2VsZiwgY2FsbCkgeyBpZiAoY2FsbCAmJiAoX3R5cGVvZihjYWxsKSA9PT0gXCJvYmplY3RcIiB8fCB0eXBlb2YgY2FsbCA9PT0gXCJmdW5jdGlvblwiKSkgeyByZXR1cm4gY2FsbDsgfSByZXR1cm4gX2Fzc2VydFRoaXNJbml0aWFsaXplZChzZWxmKTsgfVxuXG5mdW5jdGlvbiBfYXNzZXJ0VGhpc0luaXRpYWxpemVkKHNlbGYpIHsgaWYgKHNlbGYgPT09IHZvaWQgMCkgeyB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoXCJ0aGlzIGhhc24ndCBiZWVuIGluaXRpYWxpc2VkIC0gc3VwZXIoKSBoYXNuJ3QgYmVlbiBjYWxsZWRcIik7IH0gcmV0dXJuIHNlbGY7IH1cblxuZnVuY3Rpb24gX2dldFByb3RvdHlwZU9mKG8pIHsgX2dldFByb3RvdHlwZU9mID0gT2JqZWN0LnNldFByb3RvdHlwZU9mID8gT2JqZWN0LmdldFByb3RvdHlwZU9mIDogZnVuY3Rpb24gX2dldFByb3RvdHlwZU9mKG8pIHsgcmV0dXJuIG8uX19wcm90b19fIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihvKTsgfTsgcmV0dXJuIF9nZXRQcm90b3R5cGVPZihvKTsgfVxuXG5mdW5jdGlvbiBfaW5oZXJpdHMoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHsgaWYgKHR5cGVvZiBzdXBlckNsYXNzICE9PSBcImZ1bmN0aW9uXCIgJiYgc3VwZXJDbGFzcyAhPT0gbnVsbCkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3VwZXIgZXhwcmVzc2lvbiBtdXN0IGVpdGhlciBiZSBudWxsIG9yIGEgZnVuY3Rpb25cIik7IH0gc3ViQ2xhc3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzICYmIHN1cGVyQ2xhc3MucHJvdG90eXBlLCB7IGNvbnN0cnVjdG9yOiB7IHZhbHVlOiBzdWJDbGFzcywgd3JpdGFibGU6IHRydWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSB9IH0pOyBpZiAoc3VwZXJDbGFzcykgX3NldFByb3RvdHlwZU9mKHN1YkNsYXNzLCBzdXBlckNsYXNzKTsgfVxuXG5mdW5jdGlvbiBfc2V0UHJvdG90eXBlT2YobywgcCkgeyBfc2V0UHJvdG90eXBlT2YgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHwgZnVuY3Rpb24gX3NldFByb3RvdHlwZU9mKG8sIHApIHsgby5fX3Byb3RvX18gPSBwOyByZXR1cm4gbzsgfTsgcmV0dXJuIF9zZXRQcm90b3R5cGVPZihvLCBwKTsgfVxuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgY29tbW9uXzEgPSByZXF1aXJlKFwiLi4vLi4vY29tbW9uXCIpO1xuXG52YXIgZ3JvdXBzXzEgPSByZXF1aXJlKFwiLi4vLi4vY29tbW9uL0JCQWJzdHJhY3RCYWNrZW5kL2dyb3Vwc1wiKTtcblxudmFyIEJCR3JvdXBzID1cbi8qI19fUFVSRV9fKi9cbmZ1bmN0aW9uIChfZ3JvdXBzXzEkZGVmYXVsdCkge1xuICBfaW5oZXJpdHMoQkJHcm91cHMsIF9ncm91cHNfMSRkZWZhdWx0KTtcblxuICBmdW5jdGlvbiBCQkdyb3VwcygpIHtcbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgQkJHcm91cHMpO1xuXG4gICAgcmV0dXJuIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHRoaXMsIF9nZXRQcm90b3R5cGVPZihCQkdyb3VwcykuYXBwbHkodGhpcywgYXJndW1lbnRzKSk7XG4gIH1cblxuICBfY3JlYXRlQ2xhc3MoQkJHcm91cHMsIFt7XG4gICAga2V5OiBcImdldEdyb3Vwc1wiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBnZXRHcm91cHMocGFyYW1ldGVycykge1xuICAgICAgdmFyIHBhdGggPSBcIi9sZWFybi9hcGkvcHVibGljL3YxL2NvdXJzZXMvXCIgKyBwYXJhbWV0ZXJzLmNvdXJzZUlkICsgXCIvZ3JvdXBzXCI7XG4gICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBjb21tb25fMS5IVFRQUmVxdWVzdC5nZXRBc3luYyhwYXRoKS50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgIHZhciBhbGxHcm91cEluZm9ybWF0aW9uID0gSlNPTi5wYXJzZShyZXNwb25zZSk7XG4gICAgICAgICAgdmFyIHJlc3BvbnNlSW5mbyA9IG5ldyBBcnJheSgpO1xuICAgICAgICAgIGFsbEdyb3VwSW5mb3JtYXRpb24ucmVzdWx0cy5mb3JFYWNoKGZ1bmN0aW9uIChyZXN1bHQpIHtcbiAgICAgICAgICAgIHZhciByZXN1bHRPYmplY3QgPSB7XG4gICAgICAgICAgICAgIGlkOiByZXN1bHQuaWQsXG4gICAgICAgICAgICAgIG5hbWU6IHJlc3VsdC5uYW1lLFxuICAgICAgICAgICAgICBkZXNjOiByZXN1bHQuZGVzY3JpcHRpb25cbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICByZXNwb25zZUluZm8ucHVzaChyZXN1bHRPYmplY3QpO1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIHJlc29sdmUocmVzcG9uc2VJbmZvKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1dKTtcblxuICByZXR1cm4gQkJHcm91cHM7XG59KGdyb3Vwc18xW1wiZGVmYXVsdFwiXSk7XG5cbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gQkJHcm91cHM7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmZ1bmN0aW9uIF90eXBlb2Yob2JqKSB7IGlmICh0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgdHlwZW9mIFN5bWJvbC5pdGVyYXRvciA9PT0gXCJzeW1ib2xcIikgeyBfdHlwZW9mID0gZnVuY3Rpb24gX3R5cGVvZihvYmopIHsgcmV0dXJuIHR5cGVvZiBvYmo7IH07IH0gZWxzZSB7IF90eXBlb2YgPSBmdW5jdGlvbiBfdHlwZW9mKG9iaikgeyByZXR1cm4gb2JqICYmIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvYmouY29uc3RydWN0b3IgPT09IFN5bWJvbCAmJiBvYmogIT09IFN5bWJvbC5wcm90b3R5cGUgPyBcInN5bWJvbFwiIDogdHlwZW9mIG9iajsgfTsgfSByZXR1cm4gX3R5cGVvZihvYmopOyB9XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5cbmZ1bmN0aW9uIF9kZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHsgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykgeyB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldOyBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7IGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTsgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpOyB9IH1cblxuZnVuY3Rpb24gX2NyZWF0ZUNsYXNzKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykgeyBpZiAocHJvdG9Qcm9wcykgX2RlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTsgaWYgKHN0YXRpY1Byb3BzKSBfZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpOyByZXR1cm4gQ29uc3RydWN0b3I7IH1cblxuZnVuY3Rpb24gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4oc2VsZiwgY2FsbCkgeyBpZiAoY2FsbCAmJiAoX3R5cGVvZihjYWxsKSA9PT0gXCJvYmplY3RcIiB8fCB0eXBlb2YgY2FsbCA9PT0gXCJmdW5jdGlvblwiKSkgeyByZXR1cm4gY2FsbDsgfSByZXR1cm4gX2Fzc2VydFRoaXNJbml0aWFsaXplZChzZWxmKTsgfVxuXG5mdW5jdGlvbiBfYXNzZXJ0VGhpc0luaXRpYWxpemVkKHNlbGYpIHsgaWYgKHNlbGYgPT09IHZvaWQgMCkgeyB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoXCJ0aGlzIGhhc24ndCBiZWVuIGluaXRpYWxpc2VkIC0gc3VwZXIoKSBoYXNuJ3QgYmVlbiBjYWxsZWRcIik7IH0gcmV0dXJuIHNlbGY7IH1cblxuZnVuY3Rpb24gX2dldFByb3RvdHlwZU9mKG8pIHsgX2dldFByb3RvdHlwZU9mID0gT2JqZWN0LnNldFByb3RvdHlwZU9mID8gT2JqZWN0LmdldFByb3RvdHlwZU9mIDogZnVuY3Rpb24gX2dldFByb3RvdHlwZU9mKG8pIHsgcmV0dXJuIG8uX19wcm90b19fIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihvKTsgfTsgcmV0dXJuIF9nZXRQcm90b3R5cGVPZihvKTsgfVxuXG5mdW5jdGlvbiBfaW5oZXJpdHMoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHsgaWYgKHR5cGVvZiBzdXBlckNsYXNzICE9PSBcImZ1bmN0aW9uXCIgJiYgc3VwZXJDbGFzcyAhPT0gbnVsbCkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3VwZXIgZXhwcmVzc2lvbiBtdXN0IGVpdGhlciBiZSBudWxsIG9yIGEgZnVuY3Rpb25cIik7IH0gc3ViQ2xhc3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzICYmIHN1cGVyQ2xhc3MucHJvdG90eXBlLCB7IGNvbnN0cnVjdG9yOiB7IHZhbHVlOiBzdWJDbGFzcywgd3JpdGFibGU6IHRydWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSB9IH0pOyBpZiAoc3VwZXJDbGFzcykgX3NldFByb3RvdHlwZU9mKHN1YkNsYXNzLCBzdXBlckNsYXNzKTsgfVxuXG5mdW5jdGlvbiBfc2V0UHJvdG90eXBlT2YobywgcCkgeyBfc2V0UHJvdG90eXBlT2YgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHwgZnVuY3Rpb24gX3NldFByb3RvdHlwZU9mKG8sIHApIHsgby5fX3Byb3RvX18gPSBwOyByZXR1cm4gbzsgfTsgcmV0dXJuIF9zZXRQcm90b3R5cGVPZihvLCBwKTsgfVxuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgbWlzY18xID0gcmVxdWlyZShcIi4uLy4uL2NvbW1vbi9CQkFic3RyYWN0QmFja2VuZC9taXNjXCIpO1xuXG52YXIgQkJNaXNjID1cbi8qI19fUFVSRV9fKi9cbmZ1bmN0aW9uIChfbWlzY18xJGRlZmF1bHQpIHtcbiAgX2luaGVyaXRzKEJCTWlzYywgX21pc2NfMSRkZWZhdWx0KTtcblxuICBmdW5jdGlvbiBCQk1pc2MoKSB7XG4gICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIEJCTWlzYyk7XG5cbiAgICByZXR1cm4gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4odGhpcywgX2dldFByb3RvdHlwZU9mKEJCTWlzYykuYXBwbHkodGhpcywgYXJndW1lbnRzKSk7XG4gIH1cblxuICBfY3JlYXRlQ2xhc3MoQkJNaXNjLCBbe1xuICAgIGtleTogXCJnZXRCbGFja2JvYXJkRG9tYWluXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGdldEJsYWNrYm9hcmREb21haW4oKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJNZXRob2Qgbm90IGltcGxlbWVudGVkLlwiKTtcbiAgICB9XG4gIH1dKTtcblxuICByZXR1cm4gQkJNaXNjO1xufShtaXNjXzFbXCJkZWZhdWx0XCJdKTtcblxuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBCQk1pc2M7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmZ1bmN0aW9uIF90eXBlb2Yob2JqKSB7IGlmICh0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgdHlwZW9mIFN5bWJvbC5pdGVyYXRvciA9PT0gXCJzeW1ib2xcIikgeyBfdHlwZW9mID0gZnVuY3Rpb24gX3R5cGVvZihvYmopIHsgcmV0dXJuIHR5cGVvZiBvYmo7IH07IH0gZWxzZSB7IF90eXBlb2YgPSBmdW5jdGlvbiBfdHlwZW9mKG9iaikgeyByZXR1cm4gb2JqICYmIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvYmouY29uc3RydWN0b3IgPT09IFN5bWJvbCAmJiBvYmogIT09IFN5bWJvbC5wcm90b3R5cGUgPyBcInN5bWJvbFwiIDogdHlwZW9mIG9iajsgfTsgfSByZXR1cm4gX3R5cGVvZihvYmopOyB9XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5cbmZ1bmN0aW9uIF9kZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHsgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykgeyB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldOyBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7IGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTsgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpOyB9IH1cblxuZnVuY3Rpb24gX2NyZWF0ZUNsYXNzKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykgeyBpZiAocHJvdG9Qcm9wcykgX2RlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTsgaWYgKHN0YXRpY1Byb3BzKSBfZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpOyByZXR1cm4gQ29uc3RydWN0b3I7IH1cblxuZnVuY3Rpb24gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4oc2VsZiwgY2FsbCkgeyBpZiAoY2FsbCAmJiAoX3R5cGVvZihjYWxsKSA9PT0gXCJvYmplY3RcIiB8fCB0eXBlb2YgY2FsbCA9PT0gXCJmdW5jdGlvblwiKSkgeyByZXR1cm4gY2FsbDsgfSByZXR1cm4gX2Fzc2VydFRoaXNJbml0aWFsaXplZChzZWxmKTsgfVxuXG5mdW5jdGlvbiBfYXNzZXJ0VGhpc0luaXRpYWxpemVkKHNlbGYpIHsgaWYgKHNlbGYgPT09IHZvaWQgMCkgeyB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoXCJ0aGlzIGhhc24ndCBiZWVuIGluaXRpYWxpc2VkIC0gc3VwZXIoKSBoYXNuJ3QgYmVlbiBjYWxsZWRcIik7IH0gcmV0dXJuIHNlbGY7IH1cblxuZnVuY3Rpb24gX2dldFByb3RvdHlwZU9mKG8pIHsgX2dldFByb3RvdHlwZU9mID0gT2JqZWN0LnNldFByb3RvdHlwZU9mID8gT2JqZWN0LmdldFByb3RvdHlwZU9mIDogZnVuY3Rpb24gX2dldFByb3RvdHlwZU9mKG8pIHsgcmV0dXJuIG8uX19wcm90b19fIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihvKTsgfTsgcmV0dXJuIF9nZXRQcm90b3R5cGVPZihvKTsgfVxuXG5mdW5jdGlvbiBfaW5oZXJpdHMoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHsgaWYgKHR5cGVvZiBzdXBlckNsYXNzICE9PSBcImZ1bmN0aW9uXCIgJiYgc3VwZXJDbGFzcyAhPT0gbnVsbCkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3VwZXIgZXhwcmVzc2lvbiBtdXN0IGVpdGhlciBiZSBudWxsIG9yIGEgZnVuY3Rpb25cIik7IH0gc3ViQ2xhc3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzICYmIHN1cGVyQ2xhc3MucHJvdG90eXBlLCB7IGNvbnN0cnVjdG9yOiB7IHZhbHVlOiBzdWJDbGFzcywgd3JpdGFibGU6IHRydWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSB9IH0pOyBpZiAoc3VwZXJDbGFzcykgX3NldFByb3RvdHlwZU9mKHN1YkNsYXNzLCBzdXBlckNsYXNzKTsgfVxuXG5mdW5jdGlvbiBfc2V0UHJvdG90eXBlT2YobywgcCkgeyBfc2V0UHJvdG90eXBlT2YgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHwgZnVuY3Rpb24gX3NldFByb3RvdHlwZU9mKG8sIHApIHsgby5fX3Byb3RvX18gPSBwOyByZXR1cm4gbzsgfTsgcmV0dXJuIF9zZXRQcm90b3R5cGVPZihvLCBwKTsgfVxuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgY29tbW9uXzEgPSByZXF1aXJlKFwiLi4vLi4vY29tbW9uXCIpO1xuXG52YXIgdXNlcnNfMSA9IHJlcXVpcmUoXCIuLi8uLi9jb21tb24vQkJBYnN0cmFjdEJhY2tlbmQvdXNlcnNcIik7XG5cbnZhciBCQlVzZXJzID1cbi8qI19fUFVSRV9fKi9cbmZ1bmN0aW9uIChfdXNlcnNfMSRkZWZhdWx0KSB7XG4gIF9pbmhlcml0cyhCQlVzZXJzLCBfdXNlcnNfMSRkZWZhdWx0KTtcblxuICBmdW5jdGlvbiBCQlVzZXJzKCkge1xuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBCQlVzZXJzKTtcblxuICAgIHJldHVybiBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybih0aGlzLCBfZ2V0UHJvdG90eXBlT2YoQkJVc2VycykuYXBwbHkodGhpcywgYXJndW1lbnRzKSk7XG4gIH1cblxuICBfY3JlYXRlQ2xhc3MoQkJVc2VycywgW3tcbiAgICBrZXk6IFwiZ2V0VXNlckluZm9cIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gZ2V0VXNlckluZm8ocGFyYW1ldGVycykge1xuICAgICAgaWYgKHBhcmFtZXRlcnMudXNlcklkKSB7XG4gICAgICAgIHZhciBwYXRoID0gXCIvbGVhcm4vYXBpL3B1YmxpYy92MS91c2Vycy9cIiArIHBhcmFtZXRlcnMudXNlcklkO1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgIGNvbW1vbl8xLkhUVFBSZXF1ZXN0LmdldEFzeW5jKHBhdGgpLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICB2YXIgdXNlckpzb24gPSBKU09OLnBhcnNlKHJlc3BvbnNlKTtcbiAgICAgICAgICAgIHZhciB1c2VyT2JqZWN0ID0ge1xuICAgICAgICAgICAgICBlbWFpbDogdXNlckpzb24uY29udGFjdC5lbWFpbCxcbiAgICAgICAgICAgICAgZmlyc3RuYW1lOiB1c2VySnNvbi5uYW1lLmdpdmVuLFxuICAgICAgICAgICAgICBpZDogdXNlckpzb24uaWQsXG4gICAgICAgICAgICAgIHN0dWRlbnQ6IHVzZXJKc29uLnN0dWRlbnRJZCxcbiAgICAgICAgICAgICAgc3VybmFtZTogdXNlckpzb24ubmFtZS5mYW1pbHksXG4gICAgICAgICAgICAgIHVzZXJuYW1lOiB1c2VySnNvbi51c2VyTmFtZVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHJlc29sdmUodXNlck9iamVjdCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIGlmIChwYXJhbWV0ZXJzLnVzZXJOYW1lKSB7XG4gICAgICAgIHZhciBfcGF0aCA9IFwiL2xlYXJuL2FwaS9wdWJsaWMvdjEvdXNlcnM/bGltaXQ9MSZ1c2VyTmFtZT1cIiArIHBhcmFtZXRlcnMudXNlck5hbWU7XG5cbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICBjb21tb25fMS5IVFRQUmVxdWVzdC5nZXRBc3luYyhfcGF0aCkudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgIHZhciB1c2VySnNvbiA9IEpTT04ucGFyc2UocmVzcG9uc2UpO1xuXG4gICAgICAgICAgICBpZiAodXNlckpzb24ucmVzdWx0cy5sZW5ndGggPCAxKSB7XG4gICAgICAgICAgICAgIHJlamVjdCgpO1xuICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciB1c2VyT2JqZWN0ID0ge1xuICAgICAgICAgICAgICBlbWFpbDogdXNlckpzb24ucmVzdWx0c1swXS5jb250YWN0LmVtYWlsLFxuICAgICAgICAgICAgICBmaXJzdG5hbWU6IHVzZXJKc29uLnJlc3VsdHNbMF0ubmFtZS5naXZlbixcbiAgICAgICAgICAgICAgaWQ6IHVzZXJKc29uLnJlc3VsdHNbMF0uaWQsXG4gICAgICAgICAgICAgIHN0dWRlbnQ6IHVzZXJKc29uLnJlc3VsdHNbMF0uc3R1ZGVudElkLFxuICAgICAgICAgICAgICBzdXJuYW1lOiB1c2VySnNvbi5yZXN1bHRzWzBdLm5hbWUuZmFtaWx5LFxuICAgICAgICAgICAgICB1c2VybmFtZTogdXNlckpzb24ucmVzdWx0c1swXS51c2VyTmFtZVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHJlc29sdmUodXNlck9iamVjdCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJnZXRDdXJyZW50VXNlcklkXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGdldEN1cnJlbnRVc2VySWQocGFyYW1ldGVycykge1xuICAgICAgdmFyIHBhdGggPSBcIi93ZWJhcHBzL2JsYWNrYm9hcmQvZXhlY3V0ZS9lZGl0VXNlcj9jb250ZXh0PXNlbGZfbW9kaWZ5XCI7XG4gICAgICB2YXIgcmVnZXggPSBuZXcgUmVnRXhwKCd1c2VyX2lkPSguKz8oPz1cIikpJyk7XG4gICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBjb21tb25fMS5IVFRQUmVxdWVzdC5nZXRBc3luYyhwYXRoKS50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgIHZhciB1c2VyaWQgPSByZWdleC5leGVjKHJlc3BvbnNlKTtcblxuICAgICAgICAgIGlmICh1c2VyaWQgPT0gbnVsbCkge1xuICAgICAgICAgICAgcmVqZWN0KCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmVzb2x2ZSh1c2VyaWRbMV0pO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfV0pO1xuXG4gIHJldHVybiBCQlVzZXJzO1xufSh1c2Vyc18xW1wiZGVmYXVsdFwiXSk7XG5cbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gQkJVc2VyczsiLCJcInVzZSBzdHJpY3RcIjtcblxuZnVuY3Rpb24gX3R5cGVvZihvYmopIHsgaWYgKHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiB0eXBlb2YgU3ltYm9sLml0ZXJhdG9yID09PSBcInN5bWJvbFwiKSB7IF90eXBlb2YgPSBmdW5jdGlvbiBfdHlwZW9mKG9iaikgeyByZXR1cm4gdHlwZW9mIG9iajsgfTsgfSBlbHNlIHsgX3R5cGVvZiA9IGZ1bmN0aW9uIF90eXBlb2Yob2JqKSB7IHJldHVybiBvYmogJiYgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9iai5jb25zdHJ1Y3RvciA9PT0gU3ltYm9sICYmIG9iaiAhPT0gU3ltYm9sLnByb3RvdHlwZSA/IFwic3ltYm9sXCIgOiB0eXBlb2Ygb2JqOyB9OyB9IHJldHVybiBfdHlwZW9mKG9iaik7IH1cblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxuZnVuY3Rpb24gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4oc2VsZiwgY2FsbCkgeyBpZiAoY2FsbCAmJiAoX3R5cGVvZihjYWxsKSA9PT0gXCJvYmplY3RcIiB8fCB0eXBlb2YgY2FsbCA9PT0gXCJmdW5jdGlvblwiKSkgeyByZXR1cm4gY2FsbDsgfSByZXR1cm4gX2Fzc2VydFRoaXNJbml0aWFsaXplZChzZWxmKTsgfVxuXG5mdW5jdGlvbiBfYXNzZXJ0VGhpc0luaXRpYWxpemVkKHNlbGYpIHsgaWYgKHNlbGYgPT09IHZvaWQgMCkgeyB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoXCJ0aGlzIGhhc24ndCBiZWVuIGluaXRpYWxpc2VkIC0gc3VwZXIoKSBoYXNuJ3QgYmVlbiBjYWxsZWRcIik7IH0gcmV0dXJuIHNlbGY7IH1cblxuZnVuY3Rpb24gX2dldFByb3RvdHlwZU9mKG8pIHsgX2dldFByb3RvdHlwZU9mID0gT2JqZWN0LnNldFByb3RvdHlwZU9mID8gT2JqZWN0LmdldFByb3RvdHlwZU9mIDogZnVuY3Rpb24gX2dldFByb3RvdHlwZU9mKG8pIHsgcmV0dXJuIG8uX19wcm90b19fIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihvKTsgfTsgcmV0dXJuIF9nZXRQcm90b3R5cGVPZihvKTsgfVxuXG5mdW5jdGlvbiBfaW5oZXJpdHMoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHsgaWYgKHR5cGVvZiBzdXBlckNsYXNzICE9PSBcImZ1bmN0aW9uXCIgJiYgc3VwZXJDbGFzcyAhPT0gbnVsbCkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3VwZXIgZXhwcmVzc2lvbiBtdXN0IGVpdGhlciBiZSBudWxsIG9yIGEgZnVuY3Rpb25cIik7IH0gc3ViQ2xhc3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzICYmIHN1cGVyQ2xhc3MucHJvdG90eXBlLCB7IGNvbnN0cnVjdG9yOiB7IHZhbHVlOiBzdWJDbGFzcywgd3JpdGFibGU6IHRydWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSB9IH0pOyBpZiAoc3VwZXJDbGFzcykgX3NldFByb3RvdHlwZU9mKHN1YkNsYXNzLCBzdXBlckNsYXNzKTsgfVxuXG5mdW5jdGlvbiBfc2V0UHJvdG90eXBlT2YobywgcCkgeyBfc2V0UHJvdG90eXBlT2YgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHwgZnVuY3Rpb24gX3NldFByb3RvdHlwZU9mKG8sIHApIHsgby5fX3Byb3RvX18gPSBwOyByZXR1cm4gbzsgfTsgcmV0dXJuIF9zZXRQcm90b3R5cGVPZihvLCBwKTsgfVxuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgY29tbW9uXzEgPSByZXF1aXJlKFwiLi4vLi4vY29tbW9uXCIpO1xuXG52YXIgQkJDb3Vyc2VzXzEgPSByZXF1aXJlKFwiLi9CQkNvdXJzZXNcIik7XG5cbnZhciBCQkVtYWlsc18xID0gcmVxdWlyZShcIi4vQkJFbWFpbHNcIik7XG5cbnZhciBCQkZpbGVzXzEgPSByZXF1aXJlKFwiLi9CQkZpbGVzXCIpO1xuXG52YXIgQkJHcmFkZUNvbHVtbnNfMSA9IHJlcXVpcmUoXCIuL0JCR3JhZGVDb2x1bW5zXCIpO1xuXG52YXIgQkJHcm91cHNfMSA9IHJlcXVpcmUoXCIuL0JCR3JvdXBzXCIpO1xuXG52YXIgQkJNaXNjXzEgPSByZXF1aXJlKFwiLi9CQk1pc2NcIik7XG5cbnZhciBCQlVzZXJzXzEgPSByZXF1aXJlKFwiLi9CQlVzZXJzXCIpO1xuXG52YXIgQkJOYXRpdmVCYWNrZW5kID1cbi8qI19fUFVSRV9fKi9cbmZ1bmN0aW9uIChfY29tbW9uXzEkQkJBYnN0cmFjdEIpIHtcbiAgX2luaGVyaXRzKEJCTmF0aXZlQmFja2VuZCwgX2NvbW1vbl8xJEJCQWJzdHJhY3RCKTtcblxuICBmdW5jdGlvbiBCQk5hdGl2ZUJhY2tlbmQoKSB7XG4gICAgdmFyIF90aGlzO1xuXG4gICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIEJCTmF0aXZlQmFja2VuZCk7XG5cbiAgICBfdGhpcyA9IF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHRoaXMsIF9nZXRQcm90b3R5cGVPZihCQk5hdGl2ZUJhY2tlbmQpLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykpO1xuICAgIF90aGlzLmNvdXJzZXMgPSBuZXcgQkJDb3Vyc2VzXzFbXCJkZWZhdWx0XCJdKCk7XG4gICAgX3RoaXMuZW1haWwgPSBuZXcgQkJFbWFpbHNfMVtcImRlZmF1bHRcIl0oKTtcbiAgICBfdGhpcy5maWxlcyA9IG5ldyBCQkZpbGVzXzFbXCJkZWZhdWx0XCJdKCk7XG4gICAgX3RoaXMuZ3JhZGVDb2x1bW5zID0gbmV3IEJCR3JhZGVDb2x1bW5zXzFbXCJkZWZhdWx0XCJdKCk7XG4gICAgX3RoaXMuZ3JvdXBzID0gbmV3IEJCR3JvdXBzXzFbXCJkZWZhdWx0XCJdKCk7XG4gICAgX3RoaXMubWlzYyA9IG5ldyBCQk1pc2NfMVtcImRlZmF1bHRcIl0oKTtcbiAgICBfdGhpcy51c2VycyA9IG5ldyBCQlVzZXJzXzFbXCJkZWZhdWx0XCJdKCk7XG4gICAgcmV0dXJuIF90aGlzO1xuICB9XG5cbiAgcmV0dXJuIEJCTmF0aXZlQmFja2VuZDtcbn0oY29tbW9uXzEuQkJBYnN0cmFjdEJhY2tlbmQpO1xuXG5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IEJCTmF0aXZlQmFja2VuZDsiLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIEJCSWZyYW1lQmFja2VuZF8xID0gcmVxdWlyZShcIi4vQkJJZnJhbWVCYWNrZW5kXCIpO1xuXG5leHBvcnRzLkJCSWZyYW1lQmFja2VuZCA9IEJCSWZyYW1lQmFja2VuZF8xW1wiZGVmYXVsdFwiXTtcblxudmFyIEJCTmF0aXZlQmFja2VuZF8xID0gcmVxdWlyZShcIi4vQkJOYXRpdmVCYWNrZW5kXCIpO1xuXG5leHBvcnRzLkJCTmF0aXZlQmFja2VuZCA9IEJCTmF0aXZlQmFja2VuZF8xW1wiZGVmYXVsdFwiXTsiLCJcInVzZSBzdHJpY3RcIjtcblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIENvdXJzZXMgPSBmdW5jdGlvbiBDb3Vyc2VzKCkge1xuICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgQ291cnNlcyk7XG59O1xuXG5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IENvdXJzZXM7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBFbWFpbCA9IGZ1bmN0aW9uIEVtYWlsKCkge1xuICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgRW1haWwpO1xufTtcblxuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBFbWFpbDsiLCJcInVzZSBzdHJpY3RcIjtcblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIEZpbGVzID0gZnVuY3Rpb24gRmlsZXMoKSB7XG4gIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBGaWxlcyk7XG59O1xuXG5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IEZpbGVzOyIsIlwidXNlIHN0cmljdFwiO1xuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgR3JhZGVDb2x1bW5zID0gZnVuY3Rpb24gR3JhZGVDb2x1bW5zKCkge1xuICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgR3JhZGVDb2x1bW5zKTtcbn07XG5cbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gR3JhZGVDb2x1bW5zOyIsIlwidXNlIHN0cmljdFwiO1xuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgR3JvdXBzID0gZnVuY3Rpb24gR3JvdXBzKCkge1xuICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgR3JvdXBzKTtcbn07XG5cbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gR3JvdXBzOyIsIlwidXNlIHN0cmljdFwiO1xuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgQkJBYnN0cmFjdEJhY2tlbmQgPSBmdW5jdGlvbiBCQkFic3RyYWN0QmFja2VuZCgpIHtcbiAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIEJCQWJzdHJhY3RCYWNrZW5kKTtcbn07XG5cbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gQkJBYnN0cmFjdEJhY2tlbmQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBNaXNjID0gZnVuY3Rpb24gTWlzYygpIHtcbiAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIE1pc2MpO1xufTtcblxuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBNaXNjOyIsIlwidXNlIHN0cmljdFwiO1xuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgVXNlcnMgPSBmdW5jdGlvbiBVc2VycygpIHtcbiAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIFVzZXJzKTtcbn07XG5cbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gVXNlcnM7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5cbmZ1bmN0aW9uIF9kZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHsgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykgeyB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldOyBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7IGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTsgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpOyB9IH1cblxuZnVuY3Rpb24gX2NyZWF0ZUNsYXNzKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykgeyBpZiAocHJvdG9Qcm9wcykgX2RlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTsgaWYgKHN0YXRpY1Byb3BzKSBfZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpOyByZXR1cm4gQ29uc3RydWN0b3I7IH1cblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIEVtYWlsVGFyZ2V0XzEgPSByZXF1aXJlKFwiLi9FbWFpbFRhcmdldFwiKTtcblxudmFyIEVtYWlsUmVjaXBpZW50ID1cbi8qI19fUFVSRV9fKi9cbmZ1bmN0aW9uICgpIHtcbiAgX2NyZWF0ZUNsYXNzKEVtYWlsUmVjaXBpZW50LCBbe1xuICAgIGtleTogXCJ0eXBlXCIsXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICByZXR1cm4gdGhpcy5fdHlwZTtcbiAgICB9XG4gIH1dKTtcblxuICBmdW5jdGlvbiBFbWFpbFJlY2lwaWVudCh0YXJnZXRUeXBlLCB0YXJnZXRzKSB7XG4gICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBFbWFpbFJlY2lwaWVudCk7XG5cbiAgICBpZiAodGFyZ2V0VHlwZSA+IDAgJiYgIXRhcmdldHMpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIkVtYWlsIHRhcmdldCB0eXBlIFwiICsgdGFyZ2V0VHlwZS50b1N0cmluZygpICsgXCIgcmVxdWlyZXMgdGhhdCB0YXJnZXRzIGFyZSBzcGVjaWZpZWQuXCIpO1xuICAgIH1cblxuICAgIHRoaXMuX3R5cGUgPSB0YXJnZXRUeXBlO1xuICAgIHRoaXMudGFyZ2V0cyA9IFtdO1xuXG4gICAgaWYgKHRhcmdldHMpIHtcbiAgICAgIHZhciBfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uID0gdHJ1ZTtcbiAgICAgIHZhciBfZGlkSXRlcmF0b3JFcnJvciA9IGZhbHNlO1xuICAgICAgdmFyIF9pdGVyYXRvckVycm9yID0gdW5kZWZpbmVkO1xuXG4gICAgICB0cnkge1xuICAgICAgICBmb3IgKHZhciBfaXRlcmF0b3IgPSB0YXJnZXRzW1N5bWJvbC5pdGVyYXRvcl0oKSwgX3N0ZXA7ICEoX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbiA9IChfc3RlcCA9IF9pdGVyYXRvci5uZXh0KCkpLmRvbmUpOyBfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uID0gdHJ1ZSkge1xuICAgICAgICAgIHZhciB0YXJnZXQgPSBfc3RlcC52YWx1ZTtcbiAgICAgICAgICB0YXJnZXQuZ2V0VXNlcklkKCkudGhlbihmdW5jdGlvbiAoaWQpIHtcbiAgICAgICAgICAgIF90aGlzLnRhcmdldHMucHVzaChpZC50b1N0cmluZygpKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIF9kaWRJdGVyYXRvckVycm9yID0gdHJ1ZTtcbiAgICAgICAgX2l0ZXJhdG9yRXJyb3IgPSBlcnI7XG4gICAgICB9IGZpbmFsbHkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGlmICghX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbiAmJiBfaXRlcmF0b3JbXCJyZXR1cm5cIl0gIT0gbnVsbCkge1xuICAgICAgICAgICAgX2l0ZXJhdG9yW1wicmV0dXJuXCJdKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGZpbmFsbHkge1xuICAgICAgICAgIGlmIChfZGlkSXRlcmF0b3JFcnJvcikge1xuICAgICAgICAgICAgdGhyb3cgX2l0ZXJhdG9yRXJyb3I7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgX2NyZWF0ZUNsYXNzKEVtYWlsUmVjaXBpZW50LCBbe1xuICAgIGtleTogXCJhc1RhcmdldExpc3RcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gYXNUYXJnZXRMaXN0KCkge1xuICAgICAgaWYgKHRoaXMudHlwZSA9PT0gMCkge1xuICAgICAgICB0aHJvdyBuZXcgQkJFcnJvci5JbnZhbGlkT3BlcmF0aW9uRXJyb3IoXCJUaGUgdGFyZ2V0IHR5cGUgXCIgKyB0aGlzLnR5cGUudG9TdHJpbmcoKSArIFwiIGRvZXMgbm90IHN1cHBvcnQgc3BlY2lmeWluZyBpbmRpdmlkdWFsIHRhcmdldHNcIik7XG4gICAgICB9XG5cbiAgICAgIHZhciBsaXN0ID0gJyc7XG4gICAgICB2YXIgX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjIgPSB0cnVlO1xuICAgICAgdmFyIF9kaWRJdGVyYXRvckVycm9yMiA9IGZhbHNlO1xuICAgICAgdmFyIF9pdGVyYXRvckVycm9yMiA9IHVuZGVmaW5lZDtcblxuICAgICAgdHJ5IHtcbiAgICAgICAgZm9yICh2YXIgX2l0ZXJhdG9yMiA9IHRoaXMudGFyZ2V0c1tTeW1ib2wuaXRlcmF0b3JdKCksIF9zdGVwMjsgIShfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uMiA9IChfc3RlcDIgPSBfaXRlcmF0b3IyLm5leHQoKSkuZG9uZSk7IF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24yID0gdHJ1ZSkge1xuICAgICAgICAgIHZhciB0YXJnZXQgPSBfc3RlcDIudmFsdWU7XG4gICAgICAgICAgbGlzdCArPSB0YXJnZXQgKyAnLCc7XG4gICAgICAgIH1cbiAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICBfZGlkSXRlcmF0b3JFcnJvcjIgPSB0cnVlO1xuICAgICAgICBfaXRlcmF0b3JFcnJvcjIgPSBlcnI7XG4gICAgICB9IGZpbmFsbHkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGlmICghX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjIgJiYgX2l0ZXJhdG9yMltcInJldHVyblwiXSAhPSBudWxsKSB7XG4gICAgICAgICAgICBfaXRlcmF0b3IyW1wicmV0dXJuXCJdKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGZpbmFsbHkge1xuICAgICAgICAgIGlmIChfZGlkSXRlcmF0b3JFcnJvcjIpIHtcbiAgICAgICAgICAgIHRocm93IF9pdGVyYXRvckVycm9yMjtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGxpc3Q7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImdldE5hdkl0ZW1cIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gZ2V0TmF2SXRlbSgpIHtcbiAgICAgIHZhciBwb3N0Zml4ID0gJyc7XG5cbiAgICAgIHN3aXRjaCAodGhpcy50eXBlKSB7XG4gICAgICAgIGNhc2UgRW1haWxUYXJnZXRfMS5FbWFpbFRhcmdldC5BbGxVc2VyczpcbiAgICAgICAgICBwb3N0Zml4ID0gJ2FsbF91c2Vycyc7XG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSBFbWFpbFRhcmdldF8xLkVtYWlsVGFyZ2V0LkFsbEdyb3VwczpcbiAgICAgICAgICBwb3N0Zml4ID0gJ2FsbF9ncm91cHMnO1xuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgRW1haWxUYXJnZXRfMS5FbWFpbFRhcmdldC5BbGxUZWFjaGVyczpcbiAgICAgICAgICBwb3N0Zml4ID0gJ2FsbF90YSc7XG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSBFbWFpbFRhcmdldF8xLkVtYWlsVGFyZ2V0LkFsbFN0dWRlbnRzOlxuICAgICAgICAgIHBvc3RmaXggPSAnYWxsX3N0dWRlbnRzJztcbiAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlIEVtYWlsVGFyZ2V0XzEuRW1haWxUYXJnZXQuQWxsQ291cnNlTWFuYWdlcnM6XG4gICAgICAgICAgcG9zdGZpeCA9ICdhbGxfaW5zdHJ1Y3RvcnMnO1xuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgRW1haWxUYXJnZXRfMS5FbWFpbFRhcmdldC5BbGxPYnNlcnZlcnM6XG4gICAgICAgICAgcG9zdGZpeCA9ICdhbGxfb2JzZXJ2ZXJzJztcbiAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlIEVtYWlsVGFyZ2V0XzEuRW1haWxUYXJnZXQuU3BlY2lmaWNVc2VyczpcbiAgICAgICAgICBwb3N0Zml4ID0gJ3NlbGVjdF9zdHVkZW50cyc7XG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSBFbWFpbFRhcmdldF8xLkVtYWlsVGFyZ2V0LlNwZWNpZmljR3JvdXBzOlxuICAgICAgICAgIHBvc3RmaXggPSAnc2VsZWN0X2dyb3Vwcyc7XG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSBFbWFpbFRhcmdldF8xLkVtYWlsVGFyZ2V0LlNwZWNpZmljT2JzZXJ2ZXJzOlxuICAgICAgICAgIHBvc3RmaXggPSAnc2VsZWN0X29ic2VydmVycyc7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiAnY3Bfc2VuZF9lbWFpbF8nICsgcG9zdGZpeDtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiYXNQbGFpbk9iamVjdFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBhc1BsYWluT2JqZWN0KCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgbmF2SXRlbTogdGhpcy5nZXROYXZJdGVtKCksXG4gICAgICAgIHRhcmdldHM6IHRoaXMudHlwZSA9PT0gMCA/ICcnIDogdGhpcy5hc1RhcmdldExpc3QoKVxuICAgICAgfTtcbiAgICB9XG4gIH1dKTtcblxuICByZXR1cm4gRW1haWxSZWNpcGllbnQ7XG59KCk7XG5cbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gRW1haWxSZWNpcGllbnQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG52YXIgRW1haWxUYXJnZXQ7XG5cbihmdW5jdGlvbiAoRW1haWxUYXJnZXQpIHtcbiAgRW1haWxUYXJnZXRbRW1haWxUYXJnZXRbXCJBbGxVc2Vyc1wiXSA9IDBdID0gXCJBbGxVc2Vyc1wiO1xuICBFbWFpbFRhcmdldFtFbWFpbFRhcmdldFtcIkFsbEdyb3Vwc1wiXSA9IDBdID0gXCJBbGxHcm91cHNcIjtcbiAgRW1haWxUYXJnZXRbRW1haWxUYXJnZXRbXCJBbGxUZWFjaGVyc1wiXSA9IDBdID0gXCJBbGxUZWFjaGVyc1wiO1xuICBFbWFpbFRhcmdldFtFbWFpbFRhcmdldFtcIkFsbFN0dWRlbnRzXCJdID0gMF0gPSBcIkFsbFN0dWRlbnRzXCI7XG4gIEVtYWlsVGFyZ2V0W0VtYWlsVGFyZ2V0W1wiQWxsQ291cnNlTWFuYWdlcnNcIl0gPSAwXSA9IFwiQWxsQ291cnNlTWFuYWdlcnNcIjtcbiAgRW1haWxUYXJnZXRbRW1haWxUYXJnZXRbXCJBbGxPYnNlcnZlcnNcIl0gPSAwXSA9IFwiQWxsT2JzZXJ2ZXJzXCI7XG4gIEVtYWlsVGFyZ2V0W0VtYWlsVGFyZ2V0W1wiU3BlY2lmaWNVc2Vyc1wiXSA9IDFdID0gXCJTcGVjaWZpY1VzZXJzXCI7XG4gIEVtYWlsVGFyZ2V0W0VtYWlsVGFyZ2V0W1wiU3BlY2lmaWNHcm91cHNcIl0gPSAxXSA9IFwiU3BlY2lmaWNHcm91cHNcIjtcbiAgRW1haWxUYXJnZXRbRW1haWxUYXJnZXRbXCJTcGVjaWZpY09ic2VydmVyc1wiXSA9IDFdID0gXCJTcGVjaWZpY09ic2VydmVyc1wiO1xufSkoRW1haWxUYXJnZXQgPSBleHBvcnRzLkVtYWlsVGFyZ2V0IHx8IChleHBvcnRzLkVtYWlsVGFyZ2V0ID0ge30pKTsiLCJcInVzZSBzdHJpY3RcIjtcblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxuZnVuY3Rpb24gX2RlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7IHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07IGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTsgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlOyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7IH0gfVxuXG5mdW5jdGlvbiBfY3JlYXRlQ2xhc3MoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7IGlmIChwcm90b1Byb3BzKSBfZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpOyBpZiAoc3RhdGljUHJvcHMpIF9kZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7IHJldHVybiBDb25zdHJ1Y3RvcjsgfVxuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgSFRUUFJlcXVlc3QgPVxuLyojX19QVVJFX18qL1xuZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBIVFRQUmVxdWVzdCgpIHtcbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgSFRUUFJlcXVlc3QpO1xuICB9XG5cbiAgX2NyZWF0ZUNsYXNzKEhUVFBSZXF1ZXN0LCBudWxsLCBbe1xuICAgIGtleTogXCJhc3luY1JlcXVlc3RcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gYXN5bmNSZXF1ZXN0KHR5cGUsIHVybCkge1xuICAgICAgdmFyIGJvZHkgPSBhcmd1bWVudHMubGVuZ3RoID4gMiAmJiBhcmd1bWVudHNbMl0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1syXSA6IG51bGw7XG4gICAgICB2YXIgZm9ybWF0ID0gYXJndW1lbnRzLmxlbmd0aCA+IDMgJiYgYXJndW1lbnRzWzNdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbM10gOiAndGV4dCc7XG4gICAgICB2YXIgZ2V0UmVxdWVzdCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICAgICAgZ2V0UmVxdWVzdC5vcGVuKHR5cGUsIHVybCk7XG5cbiAgICAgIGlmIChmb3JtYXQgPT0gJ2Zvcm0nKSB7XG4gICAgICAgIGdldFJlcXVlc3Quc2V0UmVxdWVzdEhlYWRlcignQ29udGVudC10eXBlJywgJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZDsgY2hhcnNldD1VVEYtOCcpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBnZXRSZXF1ZXN0Lm9ubG9hZCA9IGZ1bmN0aW9uIChldikge1xuICAgICAgICAgIGlmIChnZXRSZXF1ZXN0LnN0YXR1cyA9PT0gMjAwKSB7XG4gICAgICAgICAgICByZXNvbHZlKGdldFJlcXVlc3QucmVzcG9uc2VUZXh0KTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmVqZWN0KGdldFJlcXVlc3Quc3RhdHVzVGV4dCk7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIGdldFJlcXVlc3Qub25lcnJvciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICByZWplY3QoZ2V0UmVxdWVzdC5zdGF0dXNUZXh0KTtcbiAgICAgICAgfTtcblxuICAgICAgICBnZXRSZXF1ZXN0LnNlbmQoYm9keSk7XG4gICAgICB9KTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiZ2V0QXN5bmNcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gZ2V0QXN5bmModXJsKSB7XG4gICAgICByZXR1cm4gdGhpcy5hc3luY1JlcXVlc3QoXCJHRVRcIiwgdXJsKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwicG9zdEFzeW5jXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHBvc3RBc3luYyh1cmwsIGZvcm1EYXRhKSB7XG4gICAgICB2YXIgZm9ybWF0ID0gYXJndW1lbnRzLmxlbmd0aCA+IDIgJiYgYXJndW1lbnRzWzJdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMl0gOiAndGV4dCc7XG4gICAgICByZXR1cm4gdGhpcy5hc3luY1JlcXVlc3QoXCJQT1NUXCIsIHVybCwgZm9ybURhdGEsIGZvcm1hdCk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImRlbGV0ZUFzeW5jXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGRlbGV0ZUFzeW5jKHVybCkge1xuICAgICAgdmFyIGZvcm1EYXRhID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiBudWxsO1xuICAgICAgcmV0dXJuIHRoaXMuYXN5bmNSZXF1ZXN0KFwiREVMRVRFXCIsIHVybCwgZm9ybURhdGEpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJwYXRjaEFzeW5jXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHBhdGNoQXN5bmModXJsLCBmb3JtRGF0YSkge1xuICAgICAgcmV0dXJuIHRoaXMuYXN5bmNSZXF1ZXN0KFwiUEFUQ0hcIiwgdXJsLCBmb3JtRGF0YSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImRvd25sb2FkQXN5bmNcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gZG93bmxvYWRBc3luYyh1cmwpIHtcbiAgICAgIHZhciBnZXRSZXF1ZXN0ID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgICBnZXRSZXF1ZXN0Lm9wZW4oXCJHRVRcIiwgdXJsKTtcbiAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGdldFJlcXVlc3Qub25sb2FkID0gZnVuY3Rpb24gKGV2KSB7XG4gICAgICAgICAgaWYgKGdldFJlcXVlc3Quc3RhdHVzID09PSAyMDApIHtcbiAgICAgICAgICAgIHZhciBibG9iID0gbmV3IEJsb2IoW2dldFJlcXVlc3QucmVzcG9uc2VdKTtcbiAgICAgICAgICAgIHJlc29sdmUoYmxvYik7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJlamVjdChnZXRSZXF1ZXN0LnN0YXR1c1RleHQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICBnZXRSZXF1ZXN0Lm9uZXJyb3IgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgcmVqZWN0KGdldFJlcXVlc3Quc3RhdHVzVGV4dCk7XG4gICAgICAgIH07XG5cbiAgICAgICAgZ2V0UmVxdWVzdC5zZW5kKCk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1dKTtcblxuICByZXR1cm4gSFRUUFJlcXVlc3Q7XG59KCk7XG5cbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gSFRUUFJlcXVlc3Q7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5cbmZ1bmN0aW9uIF9kZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHsgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykgeyB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldOyBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7IGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTsgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpOyB9IH1cblxuZnVuY3Rpb24gX2NyZWF0ZUNsYXNzKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykgeyBpZiAocHJvdG9Qcm9wcykgX2RlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTsgaWYgKHN0YXRpY1Byb3BzKSBfZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpOyByZXR1cm4gQ29uc3RydWN0b3I7IH1cblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIEhUVFBSZXF1ZXN0XzEgPSByZXF1aXJlKFwiLi9IVFRQUmVxdWVzdFwiKTtcblxudmFyIFV0aWxpdGllcyA9XG4vKiNfX1BVUkVfXyovXG5mdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIFV0aWxpdGllcygpIHtcbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgVXRpbGl0aWVzKTtcbiAgfVxuXG4gIF9jcmVhdGVDbGFzcyhVdGlsaXRpZXMsIG51bGwsIFt7XG4gICAga2V5OiBcImdldE5vbmNlRnJvbUNvdXJzZUlkXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGdldE5vbmNlRnJvbUNvdXJzZUlkKGNvdXJzZUlkKSB7XG4gICAgICB2YXIgbm9uY2VQYXRoID0gXCIvd2ViYXBwcy9ibGFja2JvYXJkL2V4ZWN1dGUvbW9kdWxlcGFnZS92aWV3P2NvdXJzZV9pZD1cIiArIGNvdXJzZUlkO1xuICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgSFRUUFJlcXVlc3RfMVtcImRlZmF1bHRcIl0uZ2V0QXN5bmMobm9uY2VQYXRoKS50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgIHZhciBwYXJzZXIgPSBuZXcgRE9NUGFyc2VyKCk7XG4gICAgICAgICAgdmFyIGRvbSA9IHBhcnNlci5wYXJzZUZyb21TdHJpbmcocmVzcG9uc2UsICd0ZXh0L2h0bWwnKTtcbiAgICAgICAgICB2YXIgbm9uY2VPYmplY3QgPSBkb20uZ2V0RWxlbWVudHNCeU5hbWUoXCJibGFja2JvYXJkLnBsYXRmb3JtLnNlY3VyaXR5Lk5vbmNlVXRpbC5ub25jZVwiKVswXTtcbiAgICAgICAgICByZXNvbHZlKG5vbmNlT2JqZWN0LnZhbHVlKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiZ2V0Tm9uY2VGcm9tRm9ybVwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBnZXROb25jZUZyb21Gb3JtKGRvYywgZm9ybU5hbWUpIHtcbiAgICAgIHZhciBmb3JtID0gZG9jLmdldEVsZW1lbnRzQnlOYW1lKGZvcm1OYW1lKVswXTtcbiAgICAgIHJldHVybiBmb3JtLmVsZW1lbnRzW1wiYmxhY2tib2FyZC5wbGF0Zm9ybS5zZWN1cml0eS5Ob25jZVV0aWwubm9uY2VcIl0udmFsdWUgfHwgXCJcIjtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiZW5jb2RlRW50aXRpZXNcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gZW5jb2RlRW50aXRpZXModmFsdWUpIHtcbiAgICAgIHJldHVybiB2YWx1ZS5yZXBsYWNlKC8mL2csICcmYW1wOycpLnJlcGxhY2UoVXRpbGl0aWVzLlNVUlJPR0FURV9QQUlSX1JFR0VYUCwgZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIHZhciBoaSA9IHZhbHVlLmNoYXJDb2RlQXQoMCk7XG4gICAgICAgIHZhciBsb3cgPSB2YWx1ZS5jaGFyQ29kZUF0KDEpO1xuICAgICAgICByZXR1cm4gJyYjJyArICgoaGkgLSAweEQ4MDApICogMHg0MDAgKyAobG93IC0gMHhEQzAwKSArIDB4MTAwMDApICsgJzsnO1xuICAgICAgfSkucmVwbGFjZShVdGlsaXRpZXMuTk9OX0FMUEhBTlVNRVJJQ19SRUdFWFAsIGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICByZXR1cm4gJyYjJyArIHZhbHVlLmNoYXJDb2RlQXQoMCkgKyAnOyc7XG4gICAgICB9KS5yZXBsYWNlKC88L2csICcmbHQ7JykucmVwbGFjZSgvPi9nLCAnJmd0OycpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJzdHJpbmdUb0Jvb2xlYW5cIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gc3RyaW5nVG9Cb29sZWFuKHZhbHVlKSB7XG4gICAgICB2YWx1ZSA9IHZhbHVlLnRvTG93ZXJDYXNlKCk7XG4gICAgICByZXR1cm4gdmFsdWUgPT09ICdvbicgfHwgdmFsdWUgPT09ICd0cnVlJyB8fCB2YWx1ZSA9PT0gJ3llcycgfHwgL15cXHMqWystXT8wKlsxLTldLy50ZXN0KHZhbHVlKTtcbiAgICB9XG4gIH1dKTtcblxuICByZXR1cm4gVXRpbGl0aWVzO1xufSgpO1xuXG5VdGlsaXRpZXMuU1VSUk9HQVRFX1BBSVJfUkVHRVhQID0gL1tcXHVEODAwLVxcdURCRkZdW1xcdURDMDAtXFx1REZGRl0vZztcblV0aWxpdGllcy5OT05fQUxQSEFOVU1FUklDX1JFR0VYUCA9IC8oW15cXCMtfnwgfCFdKS9nO1xuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBVdGlsaXRpZXM7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5cbmZ1bmN0aW9uIF9kZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHsgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykgeyB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldOyBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7IGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTsgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpOyB9IH1cblxuZnVuY3Rpb24gX2NyZWF0ZUNsYXNzKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykgeyBpZiAocHJvdG9Qcm9wcykgX2RlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTsgaWYgKHN0YXRpY1Byb3BzKSBfZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpOyByZXR1cm4gQ29uc3RydWN0b3I7IH1cblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIFdpbmRvd01lc3NhZ2VfMSA9IHJlcXVpcmUoXCIuL1dpbmRvd01lc3NhZ2VcIik7XG5cbnZhciBXaW5kb3dDb25uZWN0aW9uTWFuYWdlciA9XG4vKiNfX1BVUkVfXyovXG5mdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIFdpbmRvd0Nvbm5lY3Rpb25NYW5hZ2VyKF93aW5kb3csIGJhY2tlbmQpIHtcbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgV2luZG93Q29ubmVjdGlvbk1hbmFnZXIpO1xuXG4gICAgdGhpcy53aW5kb3cgPSBfd2luZG93O1xuICAgIHRoaXMuY2FsbGJhY2tMaXN0ID0ge307XG4gICAgdGhpcy5iYWNrZW5kID0gYmFja2VuZDtcbiAgICB2YXIgc2VsZlJlZiA9IHRoaXM7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJtZXNzYWdlXCIsIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgV2luZG93Q29ubmVjdGlvbk1hbmFnZXIucmVjZWl2ZU1lc3NhZ2Uoc2VsZlJlZiwgZXZlbnQpO1xuICAgIH0sIGZhbHNlKTtcbiAgfVxuXG4gIF9jcmVhdGVDbGFzcyhXaW5kb3dDb25uZWN0aW9uTWFuYWdlciwgW3tcbiAgICBrZXk6IFwic2VuZE1lc3NhZ2VcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gc2VuZE1lc3NhZ2UobWVzc2FnZSwgb25SZXR1cm4pIHtcbiAgICAgIGlmIChvblJldHVybikge1xuICAgICAgICB0aGlzLmNhbGxiYWNrTGlzdFttZXNzYWdlLnV1aWRdID0gb25SZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHRoaXMud2luZG93LnBvc3RNZXNzYWdlKG1lc3NhZ2UsIFwiKlwiKTtcbiAgICB9XG4gIH1dLCBbe1xuICAgIGtleTogXCJyZWNlaXZlTWVzc2FnZVwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiByZWNlaXZlTWVzc2FnZShjb25uZWN0aW9uTWFuYWdlciwgZXZlbnQpIHtcbiAgICAgIHZhciBtZXNzYWdlID0gV2luZG93TWVzc2FnZV8xLldpbmRvd01lc3NhZ2VGYWN0b3J5LmZyb21Kc29uKGV2ZW50LmRhdGEpO1xuXG4gICAgICBpZiAobWVzc2FnZSBpbnN0YW5jZW9mIFdpbmRvd01lc3NhZ2VfMS5XaW5kb3dGdW5jdGlvbkNhbGwpIHtcbiAgICAgICAgaWYgKGNvbm5lY3Rpb25NYW5hZ2VyLmJhY2tlbmQpIHtcbiAgICAgICAgICB2YXIgZmNNZXNzYWdlID0gbWVzc2FnZTtcbiAgICAgICAgICBjb25uZWN0aW9uTWFuYWdlci5iYWNrZW5kW2ZjTWVzc2FnZS5jYXRlZ29yeV1bZmNNZXNzYWdlLm1ldGhvZFNpZ25hdHVyZV0oZmNNZXNzYWdlLnBhcmFtZXRlcnMpLnRoZW4oZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICBjb25uZWN0aW9uTWFuYWdlci5zZW5kTWVzc2FnZShuZXcgV2luZG93TWVzc2FnZV8xLldpbmRvd0Z1bmN0aW9uUmV0dXJuKHZhbHVlLCBmY01lc3NhZ2UudXVpZCkpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKG1lc3NhZ2UgaW5zdGFuY2VvZiBXaW5kb3dNZXNzYWdlXzEuV2luZG93RnVuY3Rpb25SZXR1cm4pIHtcbiAgICAgICAgdmFyIGZyTWVzc2FnZSA9IG1lc3NhZ2U7XG5cbiAgICAgICAgaWYgKGZyTWVzc2FnZS51dWlkIGluIGNvbm5lY3Rpb25NYW5hZ2VyLmNhbGxiYWNrTGlzdCkge1xuICAgICAgICAgIGNvbm5lY3Rpb25NYW5hZ2VyLmNhbGxiYWNrTGlzdFtmck1lc3NhZ2UudXVpZF0oZnJNZXNzYWdlLnJldHVyblZhbHVlKTtcbiAgICAgICAgICBkZWxldGUgY29ubmVjdGlvbk1hbmFnZXIuY2FsbGJhY2tMaXN0W2ZyTWVzc2FnZS51dWlkXTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfV0pO1xuXG4gIHJldHVybiBXaW5kb3dDb25uZWN0aW9uTWFuYWdlcjtcbn0oKTtcblxuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBXaW5kb3dDb25uZWN0aW9uTWFuYWdlcjsiLCJcInVzZSBzdHJpY3RcIjtcblxuZnVuY3Rpb24gX3R5cGVvZihvYmopIHsgaWYgKHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiB0eXBlb2YgU3ltYm9sLml0ZXJhdG9yID09PSBcInN5bWJvbFwiKSB7IF90eXBlb2YgPSBmdW5jdGlvbiBfdHlwZW9mKG9iaikgeyByZXR1cm4gdHlwZW9mIG9iajsgfTsgfSBlbHNlIHsgX3R5cGVvZiA9IGZ1bmN0aW9uIF90eXBlb2Yob2JqKSB7IHJldHVybiBvYmogJiYgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9iai5jb25zdHJ1Y3RvciA9PT0gU3ltYm9sICYmIG9iaiAhPT0gU3ltYm9sLnByb3RvdHlwZSA/IFwic3ltYm9sXCIgOiB0eXBlb2Ygb2JqOyB9OyB9IHJldHVybiBfdHlwZW9mKG9iaik7IH1cblxuZnVuY3Rpb24gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4oc2VsZiwgY2FsbCkgeyBpZiAoY2FsbCAmJiAoX3R5cGVvZihjYWxsKSA9PT0gXCJvYmplY3RcIiB8fCB0eXBlb2YgY2FsbCA9PT0gXCJmdW5jdGlvblwiKSkgeyByZXR1cm4gY2FsbDsgfSByZXR1cm4gX2Fzc2VydFRoaXNJbml0aWFsaXplZChzZWxmKTsgfVxuXG5mdW5jdGlvbiBfYXNzZXJ0VGhpc0luaXRpYWxpemVkKHNlbGYpIHsgaWYgKHNlbGYgPT09IHZvaWQgMCkgeyB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoXCJ0aGlzIGhhc24ndCBiZWVuIGluaXRpYWxpc2VkIC0gc3VwZXIoKSBoYXNuJ3QgYmVlbiBjYWxsZWRcIik7IH0gcmV0dXJuIHNlbGY7IH1cblxuZnVuY3Rpb24gX2dldCh0YXJnZXQsIHByb3BlcnR5LCByZWNlaXZlcikgeyBpZiAodHlwZW9mIFJlZmxlY3QgIT09IFwidW5kZWZpbmVkXCIgJiYgUmVmbGVjdC5nZXQpIHsgX2dldCA9IFJlZmxlY3QuZ2V0OyB9IGVsc2UgeyBfZ2V0ID0gZnVuY3Rpb24gX2dldCh0YXJnZXQsIHByb3BlcnR5LCByZWNlaXZlcikgeyB2YXIgYmFzZSA9IF9zdXBlclByb3BCYXNlKHRhcmdldCwgcHJvcGVydHkpOyBpZiAoIWJhc2UpIHJldHVybjsgdmFyIGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKGJhc2UsIHByb3BlcnR5KTsgaWYgKGRlc2MuZ2V0KSB7IHJldHVybiBkZXNjLmdldC5jYWxsKHJlY2VpdmVyKTsgfSByZXR1cm4gZGVzYy52YWx1ZTsgfTsgfSByZXR1cm4gX2dldCh0YXJnZXQsIHByb3BlcnR5LCByZWNlaXZlciB8fCB0YXJnZXQpOyB9XG5cbmZ1bmN0aW9uIF9zdXBlclByb3BCYXNlKG9iamVjdCwgcHJvcGVydHkpIHsgd2hpbGUgKCFPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSkpIHsgb2JqZWN0ID0gX2dldFByb3RvdHlwZU9mKG9iamVjdCk7IGlmIChvYmplY3QgPT09IG51bGwpIGJyZWFrOyB9IHJldHVybiBvYmplY3Q7IH1cblxuZnVuY3Rpb24gX2dldFByb3RvdHlwZU9mKG8pIHsgX2dldFByb3RvdHlwZU9mID0gT2JqZWN0LnNldFByb3RvdHlwZU9mID8gT2JqZWN0LmdldFByb3RvdHlwZU9mIDogZnVuY3Rpb24gX2dldFByb3RvdHlwZU9mKG8pIHsgcmV0dXJuIG8uX19wcm90b19fIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihvKTsgfTsgcmV0dXJuIF9nZXRQcm90b3R5cGVPZihvKTsgfVxuXG5mdW5jdGlvbiBfaW5oZXJpdHMoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHsgaWYgKHR5cGVvZiBzdXBlckNsYXNzICE9PSBcImZ1bmN0aW9uXCIgJiYgc3VwZXJDbGFzcyAhPT0gbnVsbCkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3VwZXIgZXhwcmVzc2lvbiBtdXN0IGVpdGhlciBiZSBudWxsIG9yIGEgZnVuY3Rpb25cIik7IH0gc3ViQ2xhc3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzICYmIHN1cGVyQ2xhc3MucHJvdG90eXBlLCB7IGNvbnN0cnVjdG9yOiB7IHZhbHVlOiBzdWJDbGFzcywgd3JpdGFibGU6IHRydWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSB9IH0pOyBpZiAoc3VwZXJDbGFzcykgX3NldFByb3RvdHlwZU9mKHN1YkNsYXNzLCBzdXBlckNsYXNzKTsgfVxuXG5mdW5jdGlvbiBfc2V0UHJvdG90eXBlT2YobywgcCkgeyBfc2V0UHJvdG90eXBlT2YgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHwgZnVuY3Rpb24gX3NldFByb3RvdHlwZU9mKG8sIHApIHsgby5fX3Byb3RvX18gPSBwOyByZXR1cm4gbzsgfTsgcmV0dXJuIF9zZXRQcm90b3R5cGVPZihvLCBwKTsgfVxuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG5mdW5jdGlvbiBfZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7IGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHsgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTsgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlOyBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7IGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTsgfSB9XG5cbmZ1bmN0aW9uIF9jcmVhdGVDbGFzcyhDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHsgaWYgKHByb3RvUHJvcHMpIF9kZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7IGlmIChzdGF0aWNQcm9wcykgX2RlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTsgcmV0dXJuIENvbnN0cnVjdG9yOyB9XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG52YXIgV2luZG93TWVzc2FnZVR5cGU7XG5cbihmdW5jdGlvbiAoV2luZG93TWVzc2FnZVR5cGUpIHtcbiAgV2luZG93TWVzc2FnZVR5cGVbV2luZG93TWVzc2FnZVR5cGVbXCJGVU5DVElPTlwiXSA9IDFdID0gXCJGVU5DVElPTlwiO1xuICBXaW5kb3dNZXNzYWdlVHlwZVtXaW5kb3dNZXNzYWdlVHlwZVtcIlJFVFVSTlwiXSA9IDJdID0gXCJSRVRVUk5cIjtcbn0pKFdpbmRvd01lc3NhZ2VUeXBlID0gZXhwb3J0cy5XaW5kb3dNZXNzYWdlVHlwZSB8fCAoZXhwb3J0cy5XaW5kb3dNZXNzYWdlVHlwZSA9IHt9KSk7XG5cbnZhciBXaW5kb3dNZXNzYWdlRmFjdG9yeSA9XG4vKiNfX1BVUkVfXyovXG5mdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIFdpbmRvd01lc3NhZ2VGYWN0b3J5KCkge1xuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBXaW5kb3dNZXNzYWdlRmFjdG9yeSk7XG4gIH1cblxuICBfY3JlYXRlQ2xhc3MoV2luZG93TWVzc2FnZUZhY3RvcnksIG51bGwsIFt7XG4gICAga2V5OiBcImZyb21Kc29uXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGZyb21Kc29uKGpzb25PYmplY3QpIHtcbiAgICAgIHZhciBiYXNlTWVzc2FnZSA9IFdpbmRvd01lc3NhZ2UuZnJvbUpzb25PYmplY3QoanNvbk9iamVjdCk7XG5cbiAgICAgIHN3aXRjaCAoYmFzZU1lc3NhZ2UudHlwZSkge1xuICAgICAgICBjYXNlIFdpbmRvd01lc3NhZ2VUeXBlLkZVTkNUSU9OOlxuICAgICAgICAgIHJldHVybiBXaW5kb3dGdW5jdGlvbkNhbGwuZnJvbUpzb25PYmplY3QoanNvbk9iamVjdCk7XG5cbiAgICAgICAgY2FzZSBXaW5kb3dNZXNzYWdlVHlwZS5SRVRVUk46XG4gICAgICAgICAgcmV0dXJuIFdpbmRvd0Z1bmN0aW9uUmV0dXJuLmZyb21Kc29uT2JqZWN0KGpzb25PYmplY3QpO1xuICAgICAgfVxuXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJObyBXaW5kb3dNZXNzYWdlIHZhcmlhbnQgZm91bmQgZm9yIGdpdmVuIGRhdGFcIik7XG4gICAgfVxuICB9XSk7XG5cbiAgcmV0dXJuIFdpbmRvd01lc3NhZ2VGYWN0b3J5O1xufSgpO1xuXG5leHBvcnRzLldpbmRvd01lc3NhZ2VGYWN0b3J5ID0gV2luZG93TWVzc2FnZUZhY3Rvcnk7XG5cbnZhciBXaW5kb3dNZXNzYWdlID1cbi8qI19fUFVSRV9fKi9cbmZ1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gV2luZG93TWVzc2FnZSh0eXBlLCB1dWlkKSB7XG4gICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIFdpbmRvd01lc3NhZ2UpO1xuXG4gICAgaWYgKHV1aWQpIHtcbiAgICAgIHRoaXMudXVpZCA9IHV1aWQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMudXVpZCA9IFdpbmRvd01lc3NhZ2UuZ2VuZXJhdGVVdWlkdjQoKTtcbiAgICB9XG5cbiAgICB0aGlzLnR5cGUgPSB0eXBlO1xuICB9XG5cbiAgX2NyZWF0ZUNsYXNzKFdpbmRvd01lc3NhZ2UsIFt7XG4gICAga2V5OiBcInRvSnNvbk9iamVjdFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiB0b0pzb25PYmplY3QoKSB7XG4gICAgICB2YXIgcmV0dXJuT2JqZWN0ID0ge307XG4gICAgICByZXR1cm5PYmplY3RbV2luZG93TWVzc2FnZS5VVUlEX0lEXSA9IHRoaXMudXVpZDtcbiAgICAgIHJldHVybk9iamVjdFtXaW5kb3dNZXNzYWdlLlRZUEVfSURdID0gdGhpcy50eXBlO1xuICAgICAgcmV0dXJuIHJldHVybk9iamVjdDtcbiAgICB9XG4gIH1dLCBbe1xuICAgIGtleTogXCJmcm9tSnNvbk9iamVjdFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBmcm9tSnNvbk9iamVjdChqc29uT2JqZWN0KSB7XG4gICAgICByZXR1cm4gbmV3IFdpbmRvd01lc3NhZ2UoanNvbk9iamVjdFtXaW5kb3dNZXNzYWdlLlRZUEVfSURdLCBqc29uT2JqZWN0W1dpbmRvd01lc3NhZ2UuVVVJRF9JRF0pO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJnZW5lcmF0ZVV1aWR2NFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBnZW5lcmF0ZVV1aWR2NCgpIHtcbiAgICAgIHJldHVybiAoXCJcIiArIDFlNyArIC0xZTMgKyAtNGUzICsgLThlMyArIC0xZTExKS5yZXBsYWNlKC9bMDE4XS9nLCBmdW5jdGlvbiAoYykge1xuICAgICAgICB2YXIgY051bSA9IHBhcnNlSW50KGMpO1xuICAgICAgICByZXR1cm4gKGNOdW0gXiBjcnlwdG8uZ2V0UmFuZG9tVmFsdWVzKG5ldyBVaW50OEFycmF5KDEpKVswXSAmIDE1ID4+IGNOdW0gLyA0KS50b1N0cmluZygxNik7XG4gICAgICB9KTtcbiAgICB9XG4gIH1dKTtcblxuICByZXR1cm4gV2luZG93TWVzc2FnZTtcbn0oKTtcblxuV2luZG93TWVzc2FnZS5VVUlEX0lEID0gXCJ1dWlkXCI7XG5XaW5kb3dNZXNzYWdlLlRZUEVfSUQgPSBcInR5cGVcIjtcbmV4cG9ydHMuV2luZG93TWVzc2FnZSA9IFdpbmRvd01lc3NhZ2U7XG5cbnZhciBXaW5kb3dGdW5jdGlvbkNhbGwgPVxuLyojX19QVVJFX18qL1xuZnVuY3Rpb24gKF9XaW5kb3dNZXNzYWdlKSB7XG4gIF9pbmhlcml0cyhXaW5kb3dGdW5jdGlvbkNhbGwsIF9XaW5kb3dNZXNzYWdlKTtcblxuICBmdW5jdGlvbiBXaW5kb3dGdW5jdGlvbkNhbGwoY2F0ZWdvcnksIG1ldGhvZFNpZ25hdHVyZSwgcGFyYW1ldGVycywgdXVpZCkge1xuICAgIHZhciBfdGhpcztcblxuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBXaW5kb3dGdW5jdGlvbkNhbGwpO1xuXG4gICAgaWYgKHV1aWQpIHtcbiAgICAgIF90aGlzID0gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4odGhpcywgX2dldFByb3RvdHlwZU9mKFdpbmRvd0Z1bmN0aW9uQ2FsbCkuY2FsbCh0aGlzLCBXaW5kb3dNZXNzYWdlVHlwZS5GVU5DVElPTiwgdXVpZCkpO1xuICAgIH0gZWxzZSB7XG4gICAgICBfdGhpcyA9IF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHRoaXMsIF9nZXRQcm90b3R5cGVPZihXaW5kb3dGdW5jdGlvbkNhbGwpLmNhbGwodGhpcywgV2luZG93TWVzc2FnZVR5cGUuRlVOQ1RJT04pKTtcbiAgICB9XG5cbiAgICBfdGhpcy5tZXRob2RTaWduYXR1cmUgPSBtZXRob2RTaWduYXR1cmU7XG4gICAgX3RoaXMucGFyYW1ldGVycyA9IHBhcmFtZXRlcnM7XG4gICAgX3RoaXMuY2F0ZWdvcnkgPSBjYXRlZ29yeTtcbiAgICByZXR1cm4gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4oX3RoaXMpO1xuICB9XG5cbiAgX2NyZWF0ZUNsYXNzKFdpbmRvd0Z1bmN0aW9uQ2FsbCwgW3tcbiAgICBrZXk6IFwidG9Kc29uT2JqZWN0XCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHRvSnNvbk9iamVjdCgpIHtcbiAgICAgIHZhciBzID0gX2dldChfZ2V0UHJvdG90eXBlT2YoV2luZG93RnVuY3Rpb25DYWxsLnByb3RvdHlwZSksIFwidG9Kc29uT2JqZWN0XCIsIHRoaXMpLmNhbGwodGhpcyk7XG5cbiAgICAgIHNbV2luZG93RnVuY3Rpb25DYWxsLkNBVEVHT1JZX0lEXSA9IHRoaXMuY2F0ZWdvcnk7XG4gICAgICBzW1dpbmRvd0Z1bmN0aW9uQ2FsbC5NRVRIT0RfU0lHTkFUVVJFX0lEXSA9IHRoaXMubWV0aG9kU2lnbmF0dXJlO1xuICAgICAgc1tXaW5kb3dGdW5jdGlvbkNhbGwuUEFSQU1FVEVSU19JRF0gPSB0aGlzLnBhcmFtZXRlcnM7XG4gICAgICByZXR1cm4gcztcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwidHJ5Q2FsbFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiB0cnlDYWxsKGJhY2tlbmQsIGNhbGxCYWNrKSB7XG4gICAgICByZXR1cm4gYmFja2VuZFt0aGlzLm1ldGhvZFNpZ25hdHVyZV0odGhpcy5wYXJhbWV0ZXJzLCBjYWxsQmFjayk7XG4gICAgfVxuICB9XSwgW3tcbiAgICBrZXk6IFwiZnJvbUpzb25PYmplY3RcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gZnJvbUpzb25PYmplY3QoanNvbk9iamVjdCkge1xuICAgICAgdmFyIHN1cGVySW1wbCA9IFdpbmRvd01lc3NhZ2UuZnJvbUpzb25PYmplY3QoanNvbk9iamVjdCk7XG4gICAgICByZXR1cm4gbmV3IFdpbmRvd0Z1bmN0aW9uQ2FsbChqc29uT2JqZWN0W1dpbmRvd0Z1bmN0aW9uQ2FsbC5DQVRFR09SWV9JRF0sIGpzb25PYmplY3RbV2luZG93RnVuY3Rpb25DYWxsLk1FVEhPRF9TSUdOQVRVUkVfSURdLCBqc29uT2JqZWN0W1dpbmRvd0Z1bmN0aW9uQ2FsbC5QQVJBTUVURVJTX0lEXSwgc3VwZXJJbXBsLnV1aWQpO1xuICAgIH1cbiAgfV0pO1xuXG4gIHJldHVybiBXaW5kb3dGdW5jdGlvbkNhbGw7XG59KFdpbmRvd01lc3NhZ2UpO1xuXG5XaW5kb3dGdW5jdGlvbkNhbGwuTUVUSE9EX1NJR05BVFVSRV9JRCA9IFwibWV0aG9kU2lnbmF0dXJlXCI7XG5XaW5kb3dGdW5jdGlvbkNhbGwuUEFSQU1FVEVSU19JRCA9IFwicGFyYW1ldGVyc1wiO1xuV2luZG93RnVuY3Rpb25DYWxsLkNBVEVHT1JZX0lEID0gXCJjYXRlZ29yeVwiO1xuZXhwb3J0cy5XaW5kb3dGdW5jdGlvbkNhbGwgPSBXaW5kb3dGdW5jdGlvbkNhbGw7XG5cbnZhciBXaW5kb3dGdW5jdGlvblJldHVybiA9XG4vKiNfX1BVUkVfXyovXG5mdW5jdGlvbiAoX1dpbmRvd01lc3NhZ2UyKSB7XG4gIF9pbmhlcml0cyhXaW5kb3dGdW5jdGlvblJldHVybiwgX1dpbmRvd01lc3NhZ2UyKTtcblxuICBmdW5jdGlvbiBXaW5kb3dGdW5jdGlvblJldHVybihyZXR1cm5WYWx1ZSwgdXVpZCkge1xuICAgIHZhciBfdGhpczI7XG5cbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgV2luZG93RnVuY3Rpb25SZXR1cm4pO1xuXG4gICAgaWYgKHV1aWQpIHtcbiAgICAgIF90aGlzMiA9IF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHRoaXMsIF9nZXRQcm90b3R5cGVPZihXaW5kb3dGdW5jdGlvblJldHVybikuY2FsbCh0aGlzLCBXaW5kb3dNZXNzYWdlVHlwZS5SRVRVUk4sIHV1aWQpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgX3RoaXMyID0gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4odGhpcywgX2dldFByb3RvdHlwZU9mKFdpbmRvd0Z1bmN0aW9uUmV0dXJuKS5jYWxsKHRoaXMsIFdpbmRvd01lc3NhZ2VUeXBlLlJFVFVSTikpO1xuICAgIH1cblxuICAgIF90aGlzMi5yZXR1cm5WYWx1ZSA9IHJldHVyblZhbHVlO1xuICAgIHJldHVybiBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybihfdGhpczIpO1xuICB9XG5cbiAgX2NyZWF0ZUNsYXNzKFdpbmRvd0Z1bmN0aW9uUmV0dXJuLCBbe1xuICAgIGtleTogXCJ0b0pzb25PYmplY3RcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gdG9Kc29uT2JqZWN0KCkge1xuICAgICAgdmFyIHMgPSBfZ2V0KF9nZXRQcm90b3R5cGVPZihXaW5kb3dGdW5jdGlvblJldHVybi5wcm90b3R5cGUpLCBcInRvSnNvbk9iamVjdFwiLCB0aGlzKS5jYWxsKHRoaXMpO1xuXG4gICAgICBzW1dpbmRvd0Z1bmN0aW9uUmV0dXJuLlJFVFVSTl9WQUxVRV9JRF0gPSB0aGlzLnJldHVyblZhbHVlO1xuICAgICAgcmV0dXJuIHM7XG4gICAgfVxuICB9XSwgW3tcbiAgICBrZXk6IFwiZnJvbUpzb25PYmplY3RcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gZnJvbUpzb25PYmplY3QoanNvbk9iamVjdCkge1xuICAgICAgdmFyIHN1cGVySW1wbCA9IFdpbmRvd01lc3NhZ2UuZnJvbUpzb25PYmplY3QoanNvbk9iamVjdCk7XG4gICAgICByZXR1cm4gbmV3IFdpbmRvd0Z1bmN0aW9uUmV0dXJuKGpzb25PYmplY3RbV2luZG93RnVuY3Rpb25SZXR1cm4uUkVUVVJOX1ZBTFVFX0lEXSwgc3VwZXJJbXBsLnV1aWQpO1xuICAgIH1cbiAgfV0pO1xuXG4gIHJldHVybiBXaW5kb3dGdW5jdGlvblJldHVybjtcbn0oV2luZG93TWVzc2FnZSk7XG5cbldpbmRvd0Z1bmN0aW9uUmV0dXJuLlJFVFVSTl9WQUxVRV9JRCA9IFwicmV0dXJuVmFsdWVcIjtcbmV4cG9ydHMuV2luZG93RnVuY3Rpb25SZXR1cm4gPSBXaW5kb3dGdW5jdGlvblJldHVybjsiLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIEJCQWJzdHJhY3RCYWNrZW5kXzEgPSByZXF1aXJlKFwiLi9CQkFic3RyYWN0QmFja2VuZFwiKTtcblxuZXhwb3J0cy5CQkFic3RyYWN0QmFja2VuZCA9IEJCQWJzdHJhY3RCYWNrZW5kXzFbXCJkZWZhdWx0XCJdO1xuXG52YXIgRW1haWxSZWNpcGllbnRfMSA9IHJlcXVpcmUoXCIuL0VtYWlsUmVjaXBpZW50XCIpO1xuXG5leHBvcnRzLkVtYWlsUmVjaXBpZW50ID0gRW1haWxSZWNpcGllbnRfMVtcImRlZmF1bHRcIl07XG5cbnZhciBFbWFpbFRhcmdldF8xID0gcmVxdWlyZShcIi4vRW1haWxUYXJnZXRcIik7XG5cbmV4cG9ydHMuRW1haWxUYXJnZXQgPSBFbWFpbFRhcmdldF8xLkVtYWlsVGFyZ2V0O1xuXG52YXIgSFRUUFJlcXVlc3RfMSA9IHJlcXVpcmUoXCIuL0hUVFBSZXF1ZXN0XCIpO1xuXG5leHBvcnRzLkhUVFBSZXF1ZXN0ID0gSFRUUFJlcXVlc3RfMVtcImRlZmF1bHRcIl07XG5cbnZhciBVdGlsaXRpZXNfMSA9IHJlcXVpcmUoXCIuL1V0aWxpdGllc1wiKTtcblxuZXhwb3J0cy5VdGlsaXRpZXMgPSBVdGlsaXRpZXNfMVtcImRlZmF1bHRcIl07XG5cbnZhciBXaW5kb3dDb25uZWN0aW9uTWFuYWdlcl8xID0gcmVxdWlyZShcIi4vV2luZG93Q29ubmVjdGlvbk1hbmFnZXJcIik7XG5cbmV4cG9ydHMuV2luZG93Q29ubmVjdGlvbk1hbmFnZXIgPSBXaW5kb3dDb25uZWN0aW9uTWFuYWdlcl8xW1wiZGVmYXVsdFwiXTtcblxudmFyIFdpbmRvd01lc3NhZ2VfMSA9IHJlcXVpcmUoXCIuL1dpbmRvd01lc3NhZ2VcIik7XG5cbmV4cG9ydHMuV2luZG93RnVuY3Rpb25DYWxsID0gV2luZG93TWVzc2FnZV8xLldpbmRvd0Z1bmN0aW9uQ2FsbDtcbmV4cG9ydHMuV2luZG93RnVuY3Rpb25SZXR1cm4gPSBXaW5kb3dNZXNzYWdlXzEuV2luZG93RnVuY3Rpb25SZXR1cm47XG5leHBvcnRzLldpbmRvd01lc3NhZ2UgPSBXaW5kb3dNZXNzYWdlXzEuV2luZG93TWVzc2FnZTtcbmV4cG9ydHMuV2luZG93TWVzc2FnZUZhY3RvcnkgPSBXaW5kb3dNZXNzYWdlXzEuV2luZG93TWVzc2FnZUZhY3Rvcnk7XG5leHBvcnRzLldpbmRvd01lc3NhZ2VUeXBlID0gV2luZG93TWVzc2FnZV8xLldpbmRvd01lc3NhZ2VUeXBlOyIsIlwidXNlIHN0cmljdFwiO1xuXG5mdW5jdGlvbiBfX2V4cG9ydChtKSB7XG4gIGZvciAodmFyIHAgaW4gbSkge1xuICAgIGlmICghZXhwb3J0cy5oYXNPd25Qcm9wZXJ0eShwKSkgZXhwb3J0c1twXSA9IG1bcF07XG4gIH1cbn1cblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxuX19leHBvcnQocmVxdWlyZShcIi4vYXBpXCIpKTtcblxuX19leHBvcnQocmVxdWlyZShcIi4vYmFja2VuZFwiKSk7XG5cbl9fZXhwb3J0KHJlcXVpcmUoXCIuL2NvbW1vblwiKSk7XG5cbl9fZXhwb3J0KHJlcXVpcmUoXCIuL21pZGRsZXdhcmVcIikpOyIsIlwidXNlIHN0cmljdFwiO1xuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgQXBwTG9hZGVyID0gZnVuY3Rpb24gQXBwTG9hZGVyKCkge1xuICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgQXBwTG9hZGVyKTtcbn07XG5cbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gQXBwTG9hZGVyOyIsIlwidXNlIHN0cmljdFwiO1xuXG5mdW5jdGlvbiBfdHlwZW9mKG9iaikgeyBpZiAodHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgPT09IFwic3ltYm9sXCIpIHsgX3R5cGVvZiA9IGZ1bmN0aW9uIF90eXBlb2Yob2JqKSB7IHJldHVybiB0eXBlb2Ygb2JqOyB9OyB9IGVsc2UgeyBfdHlwZW9mID0gZnVuY3Rpb24gX3R5cGVvZihvYmopIHsgcmV0dXJuIG9iaiAmJiB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb2JqLmNvbnN0cnVjdG9yID09PSBTeW1ib2wgJiYgb2JqICE9PSBTeW1ib2wucHJvdG90eXBlID8gXCJzeW1ib2xcIiA6IHR5cGVvZiBvYmo7IH07IH0gcmV0dXJuIF90eXBlb2Yob2JqKTsgfVxuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG5mdW5jdGlvbiBfZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7IGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHsgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTsgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlOyBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7IGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTsgfSB9XG5cbmZ1bmN0aW9uIF9jcmVhdGVDbGFzcyhDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHsgaWYgKHByb3RvUHJvcHMpIF9kZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7IGlmIChzdGF0aWNQcm9wcykgX2RlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTsgcmV0dXJuIENvbnN0cnVjdG9yOyB9XG5cbmZ1bmN0aW9uIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHNlbGYsIGNhbGwpIHsgaWYgKGNhbGwgJiYgKF90eXBlb2YoY2FsbCkgPT09IFwib2JqZWN0XCIgfHwgdHlwZW9mIGNhbGwgPT09IFwiZnVuY3Rpb25cIikpIHsgcmV0dXJuIGNhbGw7IH0gcmV0dXJuIF9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQoc2VsZik7IH1cblxuZnVuY3Rpb24gX2Fzc2VydFRoaXNJbml0aWFsaXplZChzZWxmKSB7IGlmIChzZWxmID09PSB2b2lkIDApIHsgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKFwidGhpcyBoYXNuJ3QgYmVlbiBpbml0aWFsaXNlZCAtIHN1cGVyKCkgaGFzbid0IGJlZW4gY2FsbGVkXCIpOyB9IHJldHVybiBzZWxmOyB9XG5cbmZ1bmN0aW9uIF9nZXRQcm90b3R5cGVPZihvKSB7IF9nZXRQcm90b3R5cGVPZiA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiA/IE9iamVjdC5nZXRQcm90b3R5cGVPZiA6IGZ1bmN0aW9uIF9nZXRQcm90b3R5cGVPZihvKSB7IHJldHVybiBvLl9fcHJvdG9fXyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2Yobyk7IH07IHJldHVybiBfZ2V0UHJvdG90eXBlT2Yobyk7IH1cblxuZnVuY3Rpb24gX2luaGVyaXRzKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7IGlmICh0eXBlb2Ygc3VwZXJDbGFzcyAhPT0gXCJmdW5jdGlvblwiICYmIHN1cGVyQ2xhc3MgIT09IG51bGwpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN1cGVyIGV4cHJlc3Npb24gbXVzdCBlaXRoZXIgYmUgbnVsbCBvciBhIGZ1bmN0aW9uXCIpOyB9IHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcyAmJiBzdXBlckNsYXNzLnByb3RvdHlwZSwgeyBjb25zdHJ1Y3RvcjogeyB2YWx1ZTogc3ViQ2xhc3MsIHdyaXRhYmxlOiB0cnVlLCBjb25maWd1cmFibGU6IHRydWUgfSB9KTsgaWYgKHN1cGVyQ2xhc3MpIF9zZXRQcm90b3R5cGVPZihzdWJDbGFzcywgc3VwZXJDbGFzcyk7IH1cblxuZnVuY3Rpb24gX3NldFByb3RvdHlwZU9mKG8sIHApIHsgX3NldFByb3RvdHlwZU9mID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8IGZ1bmN0aW9uIF9zZXRQcm90b3R5cGVPZihvLCBwKSB7IG8uX19wcm90b19fID0gcDsgcmV0dXJuIG87IH07IHJldHVybiBfc2V0UHJvdG90eXBlT2YobywgcCk7IH1cblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIGNvbW1vbl8xID0gcmVxdWlyZShcIi4uL2NvbW1vblwiKTtcblxudmFyIEFwcExvYWRlcl8xID0gcmVxdWlyZShcIi4vQXBwTG9hZGVyXCIpO1xuXG52YXIgSWZyYW1lQXBwTG9hZGVyID1cbi8qI19fUFVSRV9fKi9cbmZ1bmN0aW9uIChfQXBwTG9hZGVyXzEkZGVmYXVsdCkge1xuICBfaW5oZXJpdHMoSWZyYW1lQXBwTG9hZGVyLCBfQXBwTG9hZGVyXzEkZGVmYXVsdCk7XG5cbiAgZnVuY3Rpb24gSWZyYW1lQXBwTG9hZGVyKGRvYywgYmFja2VuZCkge1xuICAgIHZhciBfdGhpcztcblxuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBJZnJhbWVBcHBMb2FkZXIpO1xuXG4gICAgX3RoaXMgPSBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybih0aGlzLCBfZ2V0UHJvdG90eXBlT2YoSWZyYW1lQXBwTG9hZGVyKS5jYWxsKHRoaXMpKTtcbiAgICBfdGhpcy5pZnJhbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaWZyYW1lXCIpO1xuICAgIF90aGlzLmlmcmFtZS5zdHlsZS53aWR0aCA9IFwiMTAwJVwiO1xuICAgIF90aGlzLmlmcmFtZS5zdHlsZS5oZWlnaHQgPSBcIjEwMCVcIjtcbiAgICBfdGhpcy5pZnJhbWUuc3R5bGUuYm9yZGVyID0gXCIwcHhcIjtcbiAgICBfdGhpcy5pZnJhbWUuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgIHZhciBpZnJhbWVDb250YWluZXIgPSBkb2MuZ2V0RWxlbWVudEJ5SWQoXCJpZnJhbWVDb250YWluZXJcIik7XG4gICAgaWZyYW1lQ29udGFpbmVyLmFwcGVuZENoaWxkKF90aGlzLmlmcmFtZSk7XG4gICAgX3RoaXMuY29ubmVjdGlvbk1hbmFnZXIgPSBuZXcgY29tbW9uXzEuV2luZG93Q29ubmVjdGlvbk1hbmFnZXIoX3RoaXMuaWZyYW1lLmNvbnRlbnRXaW5kb3csIGJhY2tlbmQpO1xuICAgIHJldHVybiBfdGhpcztcbiAgfVxuXG4gIF9jcmVhdGVDbGFzcyhJZnJhbWVBcHBMb2FkZXIsIFt7XG4gICAga2V5OiBcImxvYWRBcHBcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gbG9hZEFwcChhcHBVcmwpIHtcbiAgICAgIHRoaXMuaWZyYW1lLnNyYyA9IGFwcFVybDtcbiAgICAgIHRoaXMuaWZyYW1lLnN0eWxlLmRpc3BsYXkgPSBcIlwiO1xuICAgIH1cbiAgfV0pO1xuXG4gIHJldHVybiBJZnJhbWVBcHBMb2FkZXI7XG59KEFwcExvYWRlcl8xW1wiZGVmYXVsdFwiXSk7XG5cbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gSWZyYW1lQXBwTG9hZGVyOyIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgQXBwTG9hZGVyXzEgPSByZXF1aXJlKFwiLi9BcHBMb2FkZXJcIik7XG5cbmV4cG9ydHMuQXBwTG9hZGVyID0gQXBwTG9hZGVyXzFbXCJkZWZhdWx0XCJdO1xuXG52YXIgSWZyYW1lQXBwTG9hZGVyXzEgPSByZXF1aXJlKFwiLi9JZnJhbWVBcHBMb2FkZXJcIik7XG5cbmV4cG9ydHMuSWZyYW1lQXBwTG9hZGVyID0gSWZyYW1lQXBwTG9hZGVyXzFbXCJkZWZhdWx0XCJdOyIsImltcG9ydCB7IEJCTmF0aXZlQmFja2VuZCwgSWZyYW1lQXBwTG9hZGVyIH0gZnJvbSAnQHN0ZWZhbmZvcnR1aW4vYmxhY2tib2FyZGxpYi10ZXN0JztcclxuXHJcbndpbmRvdy5vbmxvYWQgPSAoKSA9PiB7XHJcbiAgICBjb25zdCBpZm13ID0gbmV3IElmcmFtZUFwcExvYWRlcihkb2N1bWVudCwgbmV3IEJCTmF0aXZlQmFja2VuZCgpKTtcclxuICAgIGlmbXcubG9hZEFwcChfX0NsaWVudFVSTF9fKTtcclxufTsiXSwic291cmNlUm9vdCI6IiJ9