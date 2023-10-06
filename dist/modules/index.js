"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentModule = exports.PostModule = exports.UserModule = exports.AuthenticationModule = void 0;
var authentication_module_1 = require("./authentication/authentication.module");
Object.defineProperty(exports, "AuthenticationModule", { enumerable: true, get: function () { return authentication_module_1.default; } });
var user_module_1 = require("./user/user.module");
Object.defineProperty(exports, "UserModule", { enumerable: true, get: function () { return user_module_1.default; } });
var post_module_1 = require("./post/post.module");
Object.defineProperty(exports, "PostModule", { enumerable: true, get: function () { return post_module_1.default; } });
var comment_module_1 = require("./comment/comment.module");
Object.defineProperty(exports, "CommentModule", { enumerable: true, get: function () { return comment_module_1.default; } });
//# sourceMappingURL=index.js.map