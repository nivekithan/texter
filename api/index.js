var __create = Object.create;
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __reExport = (target, module2, copyDefault, desc) => {
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && (copyDefault || key !== "default"))
        __defProp(target, key, { get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable });
  }
  return target;
};
var __toESM = (module2, isNodeMode) => {
  return __reExport(__markAsModule(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", !isNodeMode && module2 && module2.__esModule ? { get: () => module2.default, enumerable: true } : { value: module2, enumerable: true })), module2);
};
var __toCommonJS = /* @__PURE__ */ ((cache) => {
  return (module2, temp) => {
    return cache && cache.get(module2) || (temp = __reExport(__markAsModule({}), module2, 1), cache && cache.set(module2, temp), temp);
  };
})(typeof WeakMap !== "undefined" ? /* @__PURE__ */ new WeakMap() : 0);

// <stdin>
var stdin_exports = {};
__export(stdin_exports, {
  assets: () => assets_manifest_default,
  entry: () => entry,
  routes: () => routes
});

// node_modules/.pnpm/@remix-run+dev@1.4.3_react-dom@17.0.2+react@17.0.2/node_modules/@remix-run/dev/compiler/shims/react.ts
var React = __toESM(require("react"));

// app/entry.server.tsx
var entry_server_exports = {};
__export(entry_server_exports, {
  default: () => handleRequest
});
var import_react = require("@remix-run/react");
var import_server = require("react-dom/server");
function handleRequest(request, responseStatusCode, responseHeaders, remixContext) {
  let markup = (0, import_server.renderToString)(/* @__PURE__ */ React.createElement(import_react.RemixServer, {
    context: remixContext,
    url: request.url
  }));
  responseHeaders.set("Content-Type", "text/html");
  return new Response("<!DOCTYPE html>" + markup, {
    status: responseStatusCode,
    headers: responseHeaders
  });
}

// route:C:\Users\nivek\Documents\work\texter\app\root.tsx
var root_exports = {};
__export(root_exports, {
  default: () => App,
  links: () => links,
  meta: () => meta
});
var import_react2 = require("@remix-run/react");

// app/styles/app.css
var app_default = "/build/_assets/app-GKEONZ6N.css";

// route:C:\Users\nivek\Documents\work\texter\app\root.tsx
var meta = () => ({
  charset: "utf-8",
  title: "Texter",
  viewport: "width=device-width,initial-scale=1"
});
var links = () => {
  return [
    { rel: "stylesheet", href: app_default },
    { rel: "preconnect", href: "https://fonts.googleapis.com" },
    { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: true },
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;700&display=swap"
    },
    {
      rel: "icon",
      type: "image/png",
      href: "/logo.png"
    }
  ];
};
function App() {
  return /* @__PURE__ */ React.createElement("html", {
    lang: "en",
    className: "h-full"
  }, /* @__PURE__ */ React.createElement("head", null, /* @__PURE__ */ React.createElement(import_react2.Meta, null), /* @__PURE__ */ React.createElement(import_react2.Links, null)), /* @__PURE__ */ React.createElement("body", {
    className: "h-full text-white font-sans ",
    style: { backgroundColor: "hsl(0,0%,0%)" }
  }, /* @__PURE__ */ React.createElement(import_react2.Outlet, null), /* @__PURE__ */ React.createElement(import_react2.ScrollRestoration, null), /* @__PURE__ */ React.createElement(import_react2.Scripts, null), /* @__PURE__ */ React.createElement(import_react2.LiveReload, null)));
}

// route:C:\Users\nivek\Documents\work\texter\app\routes\__navbar.tsx
var navbar_exports = {};
__export(navbar_exports, {
  default: () => Index,
  loader: () => loader
});
var import_node2 = require("@remix-run/node");
var import_react6 = require("@remix-run/react");

// app/components/navBar.tsx
var import_gr = require("react-icons/gr");
var import_ri = require("react-icons/ri");
var import_bs = require("react-icons/bs");
var import_fa = require("react-icons/fa");

// app/components/formButton.tsx
var import_react3 = require("@remix-run/react");
var import_react4 = __toESM(require("react"));
var FormButton = (_a) => {
  var _b = _a, {
    children,
    action: action8,
    method,
    navigate
  } = _b, props = __objRest(_b, [
    "children",
    "action",
    "method",
    "navigate"
  ]);
  const fetcher = (0, import_react3.useFetcher)();
  return /* @__PURE__ */ import_react4.default.createElement(import_react4.default.Fragment, null, navigate ? /* @__PURE__ */ import_react4.default.createElement(import_react3.Form, {
    className: "contents",
    action: action8,
    method
  }, /* @__PURE__ */ import_react4.default.createElement("button", __spreadValues({}, props), children, " ")) : /* @__PURE__ */ import_react4.default.createElement(fetcher.Form, {
    className: "contents",
    action: action8,
    method
  }, /* @__PURE__ */ import_react4.default.createElement("button", __spreadValues({}, props), children, " ")));
};

// app/components/navBar.tsx
var import_react5 = require("@remix-run/react");
var NavBar = ({ userName }) => {
  return /* @__PURE__ */ React.createElement("div", {
    className: "flex flex-col gap-y-5"
  }, /* @__PURE__ */ React.createElement(import_gr.GrTwitter, {
    size: "30px",
    className: "mb-3 ml-4"
  }), /* @__PURE__ */ React.createElement(SideBarOption, {
    icons: /* @__PURE__ */ React.createElement(import_ri.RiHome4Line, {
      size: "30px"
    }),
    text: "Home",
    to: "/"
  }), /* @__PURE__ */ React.createElement(SideBarOption, {
    icons: /* @__PURE__ */ React.createElement(import_bs.BsBookmark, {
      size: "27px",
      className: "ml-1"
    }),
    text: "Bookmarks",
    to: "/bookmarks"
  }), /* @__PURE__ */ React.createElement(SideBarOption, {
    icons: /* @__PURE__ */ React.createElement(import_fa.FaUserAlt, {
      size: "30px",
      className: "ml-1"
    }),
    text: "Profile",
    to: `/${userName}`
  }), /* @__PURE__ */ React.createElement("div", {
    className: "ml-4"
  }, /* @__PURE__ */ React.createElement(FormButton, {
    action: `/logout`,
    method: "post",
    navigate: false,
    className: "w-full border-inherit border border-gray-300 hover:border-texter-blue rounded-full px-8 py-3 text-texter-blue"
  }, "Log out")));
};
var SideBarOption = ({ icons, text, to }) => {
  return /* @__PURE__ */ React.createElement(import_react5.Link, {
    className: "flex items-center gap-x-4 hover:bg-gray-900 rounded-full py-3 px-4",
    to
  }, icons, /* @__PURE__ */ React.createElement("span", {
    className: "text-lg"
  }, text));
};

// app/server/session.server.ts
var import_node = require("@remix-run/node");

// app/utils/utils.ts
var getEnvVar = (name) => {
  const value = process.env[name];
  if (value === void 0) {
    throw new Error(`Environment variable ${name} is not defined`);
  }
  return value;
};
var invariant = (condition, message = "Invariant failed") => {
  if (condition) {
    return;
  }
  const errorMessage = typeof message === "string" ? message : message();
  throw new Error(errorMessage);
};

// app/server/session.server.ts
var sessionStorage = (0, import_node.createCookieSessionStorage)({
  cookie: {
    name: "texter_session",
    secure: false,
    secrets: [getEnvVar("SESSION_SECRET")],
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
    httpOnly: true
  }
});
var getUserSession = async (request) => {
  const session = await sessionStorage.getSession(request.headers.get("Cookie"));
  return session;
};
var getUserId = async (request) => {
  const session = await getUserSession(request);
  const userId = session.get("userId");
  if (!userId || typeof userId !== "string") {
    return null;
  }
  return userId;
};

// app/server/supabase.server.ts
var import_supabase_js = require("@supabase/supabase-js");
var supabase = (0, import_supabase_js.createClient)(false ? getEnvVar("SUPABASE_PROD_API_URL") : getEnvVar("SUPABASE_LOCAL_API_URL"), false ? getEnvVar("SUPABASE_PROD_SERVICE_KEY") : getEnvVar("SUPABASE_LOCAL_SERVICE_KEY"));
var getTweetUserName = async (tweetId) => {
  const tweetResult = await supabase.from("tweets").select(`users!fk_user_id (
      user_name
    )`).eq("tweet_id", tweetId);
  if (tweetResult.error || tweetResult.data.length === 0) {
    return null;
  }
  const user = tweetResult.data[0].users;
  return user.user_name;
};
var getUserOfUserName = async (userName, selectQuery = "*") => {
  const query = await supabase.from("users").select(selectQuery).eq("user_name", userName);
  if (query.error || query.data.length === 0) {
    return null;
  }
  const user = query.data[0];
  return user;
};
var getUserOfUserId = async (userId, selectQuery = "*") => {
  const query = await supabase.from("users").select(selectQuery).eq("user_id", userId);
  if (query.error || query.data.length === 0) {
    return null;
  }
  const user = query.data[0];
  return user;
};
var getOneTweetFromUser = async ({
  selectQuery = "*",
  tweetId,
  userId
}) => {
  const tweetResult = await supabase.from("tweets").select(selectQuery).eq("user_id", userId).eq("tweet_id", tweetId);
  if (tweetResult.error || tweetResult.data.length === 0) {
    return null;
  }
  const tweet = tweetResult.data[0];
  return tweet;
};
var getAllTweetsFromUser = async ({
  selectQuery = "*",
  userId,
  includeReplies = true
}) => {
  let tweetQuery = supabase.from("tweets").select(selectQuery).eq("user_id", userId).order("created_at", { ascending: false });
  if (!includeReplies) {
    tweetQuery = tweetQuery.is("replied_to", null);
  }
  const tweetResult = await tweetQuery;
  if (tweetResult.error) {
    return null;
  }
  return tweetResult.data;
};
var getTweet = async ({
  selectQuery = "*",
  tweetId
}) => {
  const tweetResult = await supabase.from("tweets").select(selectQuery).eq("tweet_id", tweetId);
  if (tweetResult.error || tweetResult.data.length === 0) {
    return null;
  }
  const tweet = tweetResult.data[0];
  return tweet;
};
var getLatestTweets = async ({
  count,
  selectQuery
}) => {
  const query = await supabase.from("tweets").select(selectQuery).order("created_at", { ascending: false }).limit(count);
  if (query.error || query.data.length === 0) {
    return null;
  }
  return query.data;
};
var insertUserWithPassword = async ({
  passwordHash,
  userName
}) => {
  const insertResult = await supabase.from("users").insert({ user_name: userName, password_hash: passwordHash });
  if (insertResult.error || insertResult.data.length === 0) {
    return null;
  }
  const user = insertResult.data[0];
  return user.user_id;
};
var insertTweetFromUser = async ({
  userId,
  message
}) => {
  const query = await supabase.from("tweets").insert({ user_id: userId, message });
  if (query.error || query.data.length === 0) {
    return null;
  }
  const tweet = query.data[0];
  return tweet;
};
var insertTweetReplyFromUser = async ({
  message,
  repliedTo,
  userId
}) => {
  const addTweet = await supabase.from("tweets").insert({
    user_id: userId,
    replied_to: repliedTo,
    message
  });
  if (addTweet.error || addTweet.data.length === 0) {
    return null;
  }
  const tweet = addTweet.data[0];
  const addTweetToRepliesList = await supabase.rpc("append_to_replies", {
    add_replies_to: repliedTo,
    replied_tweet_id: tweet.tweet_id
  });
  if (addTweetToRepliesList.error) {
    return null;
  }
};
var userLikedTweet = async ({
  userId,
  tweetId
}) => {
  const query = await supabase.from("user_liked_tweet").insert({ user_id: userId, tweet_id: tweetId });
  if (query.error || query.data.length === 0) {
    return null;
  }
  const like = query.data[0];
  return like;
};
var userUnLikedTweet = async ({
  userId,
  tweetId
}) => {
  const query = await supabase.from("user_liked_tweet").delete().eq("user_id", userId).eq("tweet_id", tweetId);
  if (query.error || query.data.length === 0) {
    return null;
  }
  const like = query.data[0];
  return like;
};
var getLikeCount = async ({ tweetId }) => {
  const query = await supabase.from("user_liked_tweet").select("created_at", { count: "exact" }).eq("tweet_id", tweetId);
  if (query.error) {
    return null;
  }
  return query.count ?? 0;
};
var hasUserLikedTweet = async ({
  tweetId,
  userId
}) => {
  const query = await supabase.from("user_liked_tweet").select("created_at").eq("tweet_id", tweetId).eq("user_id", userId);
  if (query.error) {
    return null;
  }
  return query.data.length === 1;
};
var getTweetsUserHasLiked = async ({
  userId,
  selectQuery
}) => {
  const query = await supabase.from("user_liked_tweet").select(selectQuery).eq("user_id", userId).order("created_at", { ascending: false });
  if (query.error) {
    return null;
  }
  return query.data;
};
var userBookmarkedTweet = async ({
  userId,
  tweetId
}) => {
  const query = await supabase.from("user_bookmarked_tweet").insert({ user_id: userId, tweet_id: tweetId });
  if (query.error || query.data.length === 0) {
    return null;
  }
  const bookmark = query.data[0];
  return bookmark;
};
var userRemovedBookmarkedTweet = async ({
  userId,
  tweetId
}) => {
  const query = await supabase.from("user_bookmarked_tweet").delete().eq("user_id", userId).eq("tweet_id", tweetId);
  if (query.error || query.data.length === 0) {
    return null;
  }
  const bookmark = query.data[0];
  return bookmark;
};
var getBookmarkCount = async ({ tweetId }) => {
  const query = await supabase.from("user_bookmarked_tweet").select("created_at", { count: "exact" }).eq("tweet_id", tweetId);
  if (query.error) {
    return null;
  }
  return query.count ?? 0;
};
var hasUserBookmarkedTweet = async ({
  tweetId,
  userId
}) => {
  const query = await supabase.from("user_bookmarked_tweet").select("created_at").eq("tweet_id", tweetId).eq("user_id", userId);
  if (query.error) {
    return null;
  }
  return query.data.length === 1;
};
var getTweetsUserHasBookmarked = async ({
  userId,
  selectQuery
}) => {
  const query = await supabase.from("user_bookmarked_tweet").select(selectQuery).eq("user_id", userId).order("created_at", { ascending: false });
  if (query.error) {
    return null;
  }
  return query.data;
};
var uploadProfilePicture = async ({
  userId,
  extension,
  file,
  contentType
}) => {
  const path2 = `${userId}/profile_picture${extension}`;
  const uploadRes = await supabase.storage.from("pictures").upload(path2, file, { contentType });
  if (uploadRes.error) {
    const updateRes = await supabase.storage.from("pictures").update(path2, file, { contentType });
    if (updateRes.error) {
      return null;
    }
  }
  const publicUrlRes = await supabase.storage.from("pictures").getPublicUrl(path2);
  const publicUrl = publicUrlRes.publicURL;
  if (publicUrl === null) {
    return null;
  }
  const updateUser = await supabase.from("users").update({ profile_picture_url: publicUrl }).eq("user_id", userId);
  if (updateUser.error || updateUser.data.length === 0) {
    return null;
  }
  return publicUrl;
};
var uploadBackgroundPicture = async ({
  userId,
  extension,
  file,
  contentType
}) => {
  const path2 = `${userId}/background_picture${extension}`;
  const uploadRes = await supabase.storage.from("pictures").upload(path2, file, { contentType });
  if (uploadRes.error) {
    const updateRes = await supabase.storage.from("pictures").update(path2, file, { contentType });
    if (updateRes === null) {
      return null;
    }
  }
  const publicUrlRes = await supabase.storage.from("pictures").getPublicUrl(path2);
  const publicUrl = publicUrlRes.publicURL;
  if (publicUrl === null) {
    return null;
  }
  const updateUser = await supabase.from("users").update({ background_picture_url: publicUrl }).eq("user_id", userId);
  if (updateUser.error || updateUser.data.length === 0) {
    return null;
  }
  return publicUrl;
};

// route:C:\Users\nivek\Documents\work\texter\app\routes\__navbar.tsx
var loader = async ({ request }) => {
  const userId = await getUserId(request);
  if (userId === null) {
    return (0, import_node2.redirect)("/join" /* join */);
  }
  const user = await getUserOfUserId(userId, "user_name");
  if (user === null) {
    const userSession = await getUserSession(request);
    return (0, import_node2.redirect)("/join" /* join */, {
      headers: {
        "Set-Cookie": await sessionStorage.destroySession(userSession)
      }
    });
  }
  return (0, import_node2.json)({ userName: user.user_name });
};
function Index() {
  const { userName } = (0, import_react6.useLoaderData)();
  return /* @__PURE__ */ React.createElement("div", {
    className: "min-h-screen flex"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "min-h-screen ml-auto mt-3 w-[280px] pr-6 border-r border-gray-600"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "sticky top-4"
  }, /* @__PURE__ */ React.createElement(NavBar, {
    userName
  }))), /* @__PURE__ */ React.createElement("div", {
    className: "mr-auto w-[800px]"
  }, /* @__PURE__ */ React.createElement(import_react6.Outlet, null)));
}

// route:C:\Users\nivek\Documents\work\texter\app\routes\__navbar\$user.tweets.$tweetId.tsx
var user_tweets_tweetId_exports = {};
__export(user_tweets_tweetId_exports, {
  action: () => action,
  default: () => TweetPage,
  loader: () => loader2
});
var import_node3 = require("@remix-run/node");
var import_node4 = require("@remix-run/node");
var import_react13 = require("@remix-run/react");
var import_react14 = require("react");

// app/components/mainTweet.tsx
var import_react9 = require("@remix-run/react");
var import_react10 = __toESM(require("react"));
var import_react11 = require("react");
var import_ai = require("react-icons/ai");
var import_bs2 = require("react-icons/bs");
var import_fa2 = require("react-icons/fa");

// app/components/texterTextArea.tsx
var import_react7 = require("@remix-run/react");
var import_react8 = __toESM(require("react"));
var TexterTextArea = import_react8.default.forwardRef(({
  placeholder,
  name,
  label,
  errorMessage,
  autoFocus,
  userUrl,
  profilePictureUrl
}, ref) => {
  return /* @__PURE__ */ import_react8.default.createElement("div", {
    className: "flex flex-col px-3"
  }, /* @__PURE__ */ import_react8.default.createElement("label", {
    htmlFor: name,
    hidden: true
  }, label), /* @__PURE__ */ import_react8.default.createElement("div", {
    className: "flex gap-x-2"
  }, /* @__PURE__ */ import_react8.default.createElement(import_react7.Link, {
    to: userUrl
  }, /* @__PURE__ */ import_react8.default.createElement("div", {
    className: "w-[50px] h-[50px] rounded-full bg-texter-blue bg-no-repeat bg-cover",
    style: { backgroundImage: `url(${profilePictureUrl})` }
  })), /* @__PURE__ */ import_react8.default.createElement("textarea", {
    name,
    id: name,
    placeholder,
    className: "bg-inherit w-full py-4 focus:outline-none text-xl mb-2",
    autoFocus,
    ref
  })), typeof errorMessage === "string" ? /* @__PURE__ */ import_react8.default.createElement("p", {
    className: "text-red-error text-sm"
  }, errorMessage) : null);
});
TexterTextArea.displayName = "TexterTextArea";

// app/components/mainTweet.tsx
var MainTweet = ({
  message,
  replied_to,
  repliesCount,
  userName,
  likesCount,
  errorMessage,
  likeActive,
  tweetId,
  bookmarkActive,
  bookmarkCount,
  profilePictureUrl
}) => {
  const transition = (0, import_react9.useTransition)();
  const textAreaRef = (0, import_react10.useRef)(null);
  const formRef = (0, import_react10.useRef)(null);
  const isSubmitting = transition.state === "submitting";
  const userUrl = `${"/" /* home */}${userName}`;
  const tweetUrl = `${"/" /* home */}${userName}/tweets/${tweetId}`;
  const onReplyClick = (e) => {
    e.preventDefault();
    if (textAreaRef.current) {
      textAreaRef.current.scrollIntoView({ behavior: "smooth" });
      textAreaRef.current.focus();
    }
  };
  (0, import_react11.useEffect)(() => {
    var _a;
    if (!isSubmitting) {
      (_a = formRef.current) == null ? void 0 : _a.reset();
    }
  }, [isSubmitting]);
  return /* @__PURE__ */ import_react10.default.createElement("div", null, /* @__PURE__ */ import_react10.default.createElement("div", {
    className: "p-4"
  }, /* @__PURE__ */ import_react10.default.createElement("div", {
    className: "border-b border-gray-600 pb-8 flex flex-col gap-y-4"
  }, /* @__PURE__ */ import_react10.default.createElement("div", {
    className: "flex gap-x-2 items-center"
  }, /* @__PURE__ */ import_react10.default.createElement(import_react9.Link, {
    to: userUrl
  }, /* @__PURE__ */ import_react10.default.createElement("div", {
    className: "w-[50px] h-[50px] rounded-full bg-texter-blue bg-no-repeat bg-cover",
    style: { backgroundImage: `url(${profilePictureUrl})` }
  })), /* @__PURE__ */ import_react10.default.createElement("div", {
    className: "flex flex-col gap-y-1"
  }, /* @__PURE__ */ import_react10.default.createElement(import_react9.Link, {
    to: userUrl,
    className: "text hover:underline"
  }, userName), replied_to ? /* @__PURE__ */ import_react10.default.createElement(MainTweetReplyingTo, {
    repliedTo: replied_to
  }) : null)), /* @__PURE__ */ import_react10.default.createElement("p", {
    className: "whitespace-pre-line text-xl"
  }, message)), /* @__PURE__ */ import_react10.default.createElement("div", {
    className: "flex gap-x-4 p-4 border-gray-600 border-b "
  }, /* @__PURE__ */ import_react10.default.createElement(MainTweetInfo, {
    value: repliesCount,
    name: "Replies"
  }), /* @__PURE__ */ import_react10.default.createElement(MainTweetInfo, {
    value: likesCount,
    name: "Likes"
  }), /* @__PURE__ */ import_react10.default.createElement(MainTweetInfo, {
    value: bookmarkCount,
    name: "Bookmark"
  })), /* @__PURE__ */ import_react10.default.createElement("div", {
    className: "border-b border-gray-600 py-2"
  }, /* @__PURE__ */ import_react10.default.createElement(MainTweetOptions, {
    onReplyClick,
    likeActive,
    tweetUrl,
    bookmarkActive
  }))), /* @__PURE__ */ import_react10.default.createElement(import_react9.Form, {
    method: "post",
    className: "border-b border-gray-600",
    ref: formRef
  }, /* @__PURE__ */ import_react10.default.createElement(TweetYourReply, {
    ref: textAreaRef,
    errorMessage,
    userUrl,
    profilePictureUrl
  })));
};
var MainTweetReplyingTo = ({ repliedTo }) => {
  const repliedToUserUrl = `${"/" /* home */}${repliedTo}`;
  return /* @__PURE__ */ import_react10.default.createElement("span", {
    className: "text-sm text-texter-gray"
  }, "Replying to", " ", /* @__PURE__ */ import_react10.default.createElement(import_react9.Link, {
    to: repliedToUserUrl,
    className: "text-texter-blue hover:underline"
  }, `@${repliedTo}`));
};
var MainTweetInfo = ({ name, value }) => {
  return /* @__PURE__ */ import_react10.default.createElement("span", {
    className: "hover:underline"
  }, /* @__PURE__ */ import_react10.default.createElement("span", {
    className: "font-bold"
  }, value, " "), /* @__PURE__ */ import_react10.default.createElement("span", {
    className: "text-gray-500"
  }, name));
};
var MainTweetOptions = ({
  onReplyClick,
  likeActive,
  tweetUrl,
  bookmarkActive
}) => {
  const likeUrl = `${tweetUrl}/like`;
  const bookmarkUrl = `${tweetUrl}/bookmark`;
  return /* @__PURE__ */ import_react10.default.createElement("ul", {
    className: "flex justify-around"
  }, /* @__PURE__ */ import_react10.default.createElement("li", null, /* @__PURE__ */ import_react10.default.createElement("button", {
    className: "group p-3 rounded-full hover:bg-comment-blue hover:bg-opacity-20",
    onClick: onReplyClick,
    type: "button"
  }, /* @__PURE__ */ import_react10.default.createElement(import_fa2.FaRegComment, {
    size: "20px",
    className: "fill-gray-500 group-hover:fill-comment-blue"
  }))), /* @__PURE__ */ import_react10.default.createElement("li", null, /* @__PURE__ */ import_react10.default.createElement(FormButton, {
    action: likeUrl,
    method: "post",
    navigate: false,
    name: "actionType",
    value: likeActive ? "unlike" : "like",
    className: "group p-3 rounded-full hover:bg-like-red hover:bg-opacity-20"
  }, /* @__PURE__ */ import_react10.default.createElement(import_ai.AiOutlineHeart, {
    size: "20px",
    className: `group-hover:fill-like-red ${likeActive ? "fill-like-red" : "fill-gray-500"}`
  }))), /* @__PURE__ */ import_react10.default.createElement("li", null, /* @__PURE__ */ import_react10.default.createElement(FormButton, {
    action: bookmarkUrl,
    method: "post",
    navigate: false,
    name: "actionType",
    value: bookmarkActive ? "removeBookmark" : "bookmark",
    className: "group p-3 rounded-full hover:bg-like-red hover:bg-opacity-20"
  }, /* @__PURE__ */ import_react10.default.createElement(import_bs2.BsBookmarkPlus, {
    size: "20px",
    className: `group-hover:fill-like-red ${bookmarkActive ? "fill-like-red" : "fill-gray-500"}`
  }))));
};
var TweetYourReply = import_react10.default.forwardRef(({ errorMessage, userUrl, profilePictureUrl }, ref) => {
  return /* @__PURE__ */ import_react10.default.createElement("div", {
    className: "flex flex-col gap-y-2"
  }, /* @__PURE__ */ import_react10.default.createElement(TexterTextArea, {
    name: "reply",
    placeholder: "Tweet your reply",
    ref,
    errorMessage,
    label: "Your Reply",
    userUrl,
    profilePictureUrl
  }), /* @__PURE__ */ import_react10.default.createElement("div", {
    className: "flex justify-end p-4"
  }, /* @__PURE__ */ import_react10.default.createElement("button", {
    type: "submit",
    className: "bg-texter-blue px-4 py-2 rounded-full",
    name: "actionType",
    value: "tweetReply"
  }, "Tweet")));
});
TweetYourReply.displayName = "TweetYourReply";

// app/components/tweet.tsx
var import_react12 = require("@remix-run/react");
var import_fa3 = require("react-icons/fa");
var import_ai2 = require("react-icons/ai");
var import_bs3 = require("react-icons/bs");
var Tweet = ({
  userName,
  message,
  tweetId,
  repliedTo,
  likesCount,
  relpiesCount,
  likeActive,
  bookmarkCount,
  bookmarkActive,
  profilePictureUrl
}) => {
  const userUrl = `${"/" /* home */}${userName}`;
  const tweetUrl = `${"/" /* home */}${userName}/tweets/${tweetId}`;
  return /* @__PURE__ */ React.createElement("div", {
    className: "flex p-3 gap-x-2"
  }, /* @__PURE__ */ React.createElement(import_react12.Link, {
    to: userUrl
  }, /* @__PURE__ */ React.createElement("div", {
    className: "w-[50px] h-[50px] rounded-full bg-texter-blue bg-no-repeat bg-cover",
    style: { backgroundImage: `url(${profilePictureUrl})` }
  })), /* @__PURE__ */ React.createElement("div", {
    className: "flex flex-col gap-y-3"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "flex gap-x-4"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "flex flex-col"
  }, /* @__PURE__ */ React.createElement(import_react12.Link, {
    to: userUrl,
    className: "font-bold hover:underline"
  }, userName), repliedTo ? /* @__PURE__ */ React.createElement(TweetReplyingTo, {
    repliedTo
  }) : null)), /* @__PURE__ */ React.createElement(import_react12.Link, {
    to: tweetUrl
  }, /* @__PURE__ */ React.createElement("p", {
    className: "whitespace-pre-line text-sm"
  }, message)), /* @__PURE__ */ React.createElement(TweetOptions, {
    likesCount,
    repliesCount: relpiesCount,
    likeActive,
    tweetUrl,
    bookmarkActive,
    bookmarkCount
  })));
};
var TweetReplyingTo = ({ repliedTo }) => {
  const repliedToUserUrl = `${"/" /* home */}${repliedTo}`;
  return /* @__PURE__ */ React.createElement("span", {
    className: "text-xs text-texter-gray"
  }, "Replying to", " ", /* @__PURE__ */ React.createElement(import_react12.Link, {
    to: repliedToUserUrl,
    className: "text-texter-blue hover:underline"
  }, `@${repliedTo}`));
};
var TweetOptions = ({
  repliesCount,
  likesCount,
  tweetUrl,
  likeActive,
  bookmarkActive,
  bookmarkCount
}) => {
  const likeUrl = `${tweetUrl}/like`;
  const bookmarkUrl = `${tweetUrl}/bookmark`;
  return /* @__PURE__ */ React.createElement("ol", {
    className: "flex gap-x-8 -ml-2"
  }, /* @__PURE__ */ React.createElement("li", {
    className: " flex items-center gap-x-4 group"
  }, /* @__PURE__ */ React.createElement(import_react12.Link, {
    to: tweetUrl
  }, /* @__PURE__ */ React.createElement("div", {
    className: "group-hover:bg-comment-blue group-hover:bg-opacity-20 p-2 rounded-full"
  }, /* @__PURE__ */ React.createElement(import_fa3.FaRegComment, {
    size: "15px",
    className: "group-hover:fill-comment-blue fill-gray-400"
  }))), /* @__PURE__ */ React.createElement("span", {
    className: "text-xs group-hover:text-comment-blue text-gray-400 min-w-[4px]"
  }, repliesCount || null)), /* @__PURE__ */ React.createElement("li", {
    className: " flex items-center gap-x-4 group"
  }, /* @__PURE__ */ React.createElement(FormButton, {
    action: likeUrl,
    navigate: false,
    method: "post",
    name: "actionType",
    value: likeActive ? "unlike" : "like",
    className: "group-hover:bg-like-red group-hover:bg-opacity-20 p-2 rounded-full"
  }, /* @__PURE__ */ React.createElement(import_ai2.AiOutlineHeart, {
    size: "15px",
    className: `group-hover:fill-like-red ${likeActive ? "fill-like-red" : "fill-gray-400"}`
  })), /* @__PURE__ */ React.createElement("span", {
    className: `text-xs group-hover:text-like-red ${likeActive ? "text-like-red" : "text-gray-400"}`
  }, likesCount || null)), /* @__PURE__ */ React.createElement("li", {
    className: " flex items-center gap-x-4 group"
  }, /* @__PURE__ */ React.createElement(FormButton, {
    action: bookmarkUrl,
    navigate: false,
    method: "post",
    name: "actionType",
    value: bookmarkActive ? "removeBookmark" : "bookmark",
    className: "group-hover:bg-like-red group-hover:bg-opacity-20 p-2 rounded-full"
  }, /* @__PURE__ */ React.createElement(import_bs3.BsBookmarkPlus, {
    size: "15px",
    className: `group-hover:fill-like-red ${bookmarkActive ? "fill-like-red" : "fill-gray-400"}`
  })), /* @__PURE__ */ React.createElement("span", {
    className: `text-xs group-hover:text-like-red ${bookmarkActive ? "text-like-red" : "text-gray-400"}`
  }, bookmarkCount || null)));
};

// route:C:\Users\nivek\Documents\work\texter\app\routes\__navbar\$user.tweets.$tweetId.tsx
var loader2 = async ({ request, params }) => {
  const loggedInUserId = await getUserId(request);
  if (loggedInUserId === null) {
    const requestUrl = new URL(request.url);
    const searchParams = new URLSearchParams();
    searchParams.set("redirectTo", requestUrl.pathname);
    const finalUrl = `${"/join" /* join */}?${searchParams}`;
    return (0, import_node4.redirect)(finalUrl);
  }
  const userName = params.user;
  const tweetId = params.tweetId;
  invariant(userName, "Expected to have dynamic route named $user");
  invariant(tweetId, "Expected to have dynamic route named $tweetId");
  const user = await getUserOfUserName(userName, "user_name, user_id");
  if (user === null) {
    return (0, import_node3.json)({ error: "User not found", type: "error" });
  }
  const { user_id: userId } = user;
  const tweet = await getOneTweetFromUser({
    userId,
    tweetId,
    selectQuery: "message, tweet_id, replied_to, replies, users!fk_user_id(profile_picture_url)"
  });
  if (tweet === null) {
    return (0, import_node3.json)({ error: "Tweet not found", type: "error" });
  }
  if (tweet.replied_to !== null) {
    const userNameRes = await getTweetUserName(tweet.replied_to);
    invariant(userNameRes, "Expected replied_to user_id to be valid");
    tweet.replied_to = userNameRes;
  }
  const repliesResult = await Promise.all(tweet.replies.map((replyTweetId) => {
    const replyTweet = getTweet({
      tweetId: replyTweetId,
      selectQuery: "message, tweet_id, replied_to, replies, users!fk_user_id(profile_picture_url)"
    });
    return replyTweet;
  }));
  const tweetWithUserName = __spreadProps(__spreadValues({}, tweet), {
    userName,
    likesCount: await getLikeCount({ tweetId: tweet.tweet_id }) ?? 0,
    likeActive: await hasUserLikedTweet({ tweetId, userId: loggedInUserId }) ?? false,
    bookmarkCount: await getBookmarkCount({ tweetId: tweet.tweet_id }) ?? 0,
    bookmarkActive: await hasUserBookmarkedTweet({
      tweetId,
      userId: loggedInUserId
    }) ?? false,
    profilePictureUrl: tweet.users.profile_picture_url ?? ""
  });
  const replies = await Promise.all(repliesResult.map(async (repliesResult2) => {
    if (repliesResult2 === null) {
      return { type: "error", error: "Tweet not found" };
    }
    const tweetUserName = await getTweetUserName(repliesResult2.tweet_id);
    const likesCount = await getLikeCount({
      tweetId: repliesResult2.tweet_id
    }) ?? 0;
    const likeActive = await hasUserLikedTweet({
      tweetId: repliesResult2.tweet_id,
      userId: loggedInUserId
    }) ?? false;
    const bookmarkCount = await getBookmarkCount({
      tweetId: repliesResult2.tweet_id
    }) ?? 0;
    const bookmarkActive = await hasUserBookmarkedTweet({
      tweetId: repliesResult2.tweet_id,
      userId: loggedInUserId
    }) ?? false;
    if (tweetUserName === null) {
      return { type: "error", error: "User not found" };
    }
    return {
      type: "success",
      tweet: {
        message: repliesResult2.message,
        tweet_id: repliesResult2.tweet_id,
        userName: tweetUserName,
        replied_to: userName,
        replyCount: repliesResult2.replies.length,
        likesCount,
        likeActive,
        bookmarkActive,
        bookmarkCount,
        profilePictureUrl: repliesResult2.users.profile_picture_url ?? ""
      }
    };
  }));
  return (0, import_node3.json)({
    type: "success",
    tweet: __spreadProps(__spreadValues({}, tweetWithUserName), { replies })
  });
};
var action = async ({ request, params }) => {
  const formdata = await request.formData();
  const userId = await getUserId(request);
  if (userId === null) {
    return (0, import_node4.redirect)("/join" /* join */);
  }
  const actionType = formdata.get("actionType");
  if (actionType === "tweetReply") {
    const replyMessage = formdata.get("reply");
    if (!replyMessage || typeof replyMessage !== "string") {
      return (0, import_node3.json)({ errorMessage: "Please enter valid reply" });
    }
    const tweetId = params.tweetId;
    const userName = params.user;
    invariant(tweetId, "Expected to have dynamic route named $tweetId");
    invariant(userName, "Expected to have dynamic route named $user");
    const result = await insertTweetReplyFromUser({
      message: replyMessage,
      repliedTo: tweetId,
      userId
    });
    if (result === null) {
      return (0, import_node3.json)({
        errorMessage: "Error adding reply, try again later"
      });
    }
  }
  return null;
};
function TweetPage() {
  const loaderData = (0, import_react13.useLoaderData)();
  const actionData = (0, import_react13.useActionData)();
  const transition = (0, import_react13.useTransition)();
  const formRef = (0, import_react14.useRef)(null);
  const isReplying = transition.state === "submitting" && transition.submission.formData.get("actionType") === "tweetReply";
  (0, import_react14.useEffect)(() => {
    var _a;
    if (!isReplying) {
      (_a = formRef.current) == null ? void 0 : _a.reset();
    }
  }, [isReplying]);
  if (loaderData.type === "error")
    return /* @__PURE__ */ React.createElement("p", null, loaderData.error);
  const {
    tweet: {
      message,
      replied_to,
      replies,
      userName,
      likesCount,
      likeActive,
      tweet_id,
      bookmarkActive,
      bookmarkCount,
      profilePictureUrl
    }
  } = loaderData;
  return /* @__PURE__ */ React.createElement("div", {
    className: "max-w-[600px] border-r border-r-gray-600 min-h-screen"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "sticky top-0 p-4 bg-black font-bold text-xl shadow bg-opacity-80"
  }, "Thread"), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(MainTweet, {
    message,
    replied_to,
    repliesCount: replies.length,
    userName,
    errorMessage: actionData == null ? void 0 : actionData.errorMessage,
    likesCount,
    likeActive,
    tweetId: tweet_id,
    bookmarkActive,
    bookmarkCount,
    profilePictureUrl
  }), replies.map((reply) => {
    if (reply.type === "error")
      return /* @__PURE__ */ React.createElement("div", null, reply.error);
    const {
      message: message2,
      replied_to: replied_to2,
      replyCount,
      tweet_id: tweet_id2,
      userName: userName2,
      likeActive: likeActive2,
      likesCount: likesCount2,
      bookmarkActive: bookmarkActive2,
      bookmarkCount: bookmarkCount2,
      profilePictureUrl: profilePictureUrl2
    } = reply.tweet;
    return /* @__PURE__ */ React.createElement("div", {
      key: tweet_id2,
      className: "border-b border-gray-600"
    }, /* @__PURE__ */ React.createElement(Tweet, {
      likesCount: likesCount2,
      likeActive: likeActive2,
      message: message2,
      relpiesCount: replyCount,
      tweetId: tweet_id2,
      repliedTo: replied_to2 ?? void 0,
      userName: userName2,
      bookmarkActive: bookmarkActive2,
      bookmarkCount: bookmarkCount2,
      profilePictureUrl: profilePictureUrl2
    }));
  })));
}

// route:C:\Users\nivek\Documents\work\texter\app\routes\__navbar\edit-profile.tsx
var edit_profile_exports = {};
__export(edit_profile_exports, {
  action: () => action2,
  default: () => edit_profile_default,
  loader: () => loader3
});
var import_node5 = require("@remix-run/node");
var import_node6 = require("@remix-run/node");
var import_react15 = require("@remix-run/react");

// app/components/texterInput.tsx
var TexterInput = ({
  label,
  name,
  type,
  placeholder,
  autoFocus,
  error,
  errorMessage,
  defaultValue
}) => {
  return /* @__PURE__ */ React.createElement("div", {
    className: "flex flex-col w-full gap-y-6"
  }, /* @__PURE__ */ React.createElement("label", {
    htmlFor: name,
    className: "text-xl font-bold"
  }, label), /* @__PURE__ */ React.createElement("div", {
    className: "flex flex-col"
  }, /* @__PURE__ */ React.createElement("input", {
    type,
    id: name,
    name,
    className: `bg-inherit border-2  py-4 px-2 rounded focus:outline-none mb-3 ${error ? "border-red-error" : "border-gray-700 focus:border-texter-blue"}`,
    placeholder,
    autoFocus,
    defaultValue
  }), errorMessage ? /* @__PURE__ */ React.createElement("p", {
    className: "text-red-error text-sm"
  }, errorMessage) : null));
};

// route:C:\Users\nivek\Documents\work\texter\app\routes\__navbar\edit-profile.tsx
var import_bs4 = require("react-icons/bs");
var import_react16 = __toESM(require("react"));
var import_path = __toESM(require("path"));
var loader3 = async ({ request }) => {
  const loggedInUserId = await getUserId(request);
  const loggedInUser = await getUserOfUserId(loggedInUserId, "bio, background_picture_url, profile_picture_url, user_name");
  if (loggedInUser === null) {
    return (0, import_node6.json)({ error: "User not found", type: "error" });
  }
  return (0, import_node6.json)({
    type: "success",
    backgroundPictureUrl: loggedInUser.background_picture_url ?? "",
    profilePictureUrl: loggedInUser.profile_picture_url ?? "",
    bio: loggedInUser.bio ?? "",
    userName: loggedInUser.user_name
  });
};
var action2 = async ({ request }) => {
  const userId = await getUserId(request);
  const user = await getUserOfUserId(userId, "user_name");
  if (user === null) {
    const userSession = await getUserSession(request);
    return (0, import_node5.redirect)(`${"/" /* home */}${"/join" /* join */}`, {
      headers: {
        "Set-Cookie": await sessionStorage.destroySession(userSession)
      }
    });
  }
  const customUploadHandler = async ({
    encoding,
    filename,
    mimetype,
    name,
    stream
  }) => {
    const isUploadingProfilePicture = name === "profilePicture";
    const isUploadingBackgroundPicture = name == "backgroundPicture";
    if (!isUploadingBackgroundPicture && !isUploadingProfilePicture) {
      return void 0;
    }
    if (filename === "") {
      return void 0;
    }
    const extName = import_path.default.parse(filename).ext;
    const publicUrl = isUploadingProfilePicture ? await uploadProfilePicture({
      userId,
      extension: extName,
      file: stream,
      contentType: mimetype
    }) : await uploadBackgroundPicture({
      extension: extName,
      file: stream,
      userId,
      contentType: mimetype
    });
    if (publicUrl === null) {
      throw (0, import_node6.json)({
        [isUploadingBackgroundPicture ? "backgroundPictureError" : "profilePictureError"]: "Error uploading file"
      });
    }
  };
  const formData = await (0, import_node5.unstable_parseMultipartFormData)(request, customUploadHandler);
  const updatedUserName = formData.get("username");
  const updatedBio = formData.get("bio");
  if (typeof updatedUserName !== "string" || !updatedUserName) {
    return (0, import_node6.json)({ nameError: "Enter valid username" });
  }
  if (typeof updatedBio !== "string") {
    return (0, import_node6.json)({ nameError: "Enter valid bio" });
  }
  const updateRes = await supabase.from("users").update({ user_name: updatedUserName, bio: updatedBio }).eq("user_id", userId);
  if (updateRes.error) {
    return (0, import_node6.json)({
      nameError: "Enter another username, this one is already taken"
    });
  }
  return (0, import_node5.redirect)("/" /* home */);
};
var createdUrls = {
  profilePicture: null,
  backgroundPicture: null
};
function edit_profile_default() {
  const loaderData = (0, import_react15.useLoaderData)();
  const backgroundPictureInputRef = (0, import_react16.useRef)(null);
  const profilePictureInputRef = (0, import_react16.useRef)(null);
  const profilePictureRenderRef = (0, import_react16.useRef)(null);
  const backgroundPictureRenderRef = (0, import_react16.useRef)(null);
  if (loaderData.type === "error")
    return /* @__PURE__ */ import_react16.default.createElement("div", null, loaderData.error);
  const onChangeBackgroundPicture = (e) => {
    var _a;
    (_a = backgroundPictureInputRef.current) == null ? void 0 : _a.click();
  };
  const onChangeProfilePicture = (e) => {
    var _a;
    e.preventDefault();
    (_a = profilePictureInputRef.current) == null ? void 0 : _a.click();
  };
  const onBackgroundPictureInputChange = (e) => {
    var _a;
    const file = (_a = e.target.files) == null ? void 0 : _a[0];
    if (file === void 0 || !backgroundPictureRenderRef.current)
      return;
    const newUrl = URL.createObjectURL(file);
    backgroundPictureRenderRef.current.style.backgroundImage = `url(${newUrl})`;
    if (createdUrls.backgroundPicture !== null) {
      URL.revokeObjectURL(createdUrls.backgroundPicture);
    }
    createdUrls.backgroundPicture = newUrl;
  };
  const onProfilePictureInputChange = (e) => {
    var _a;
    const file = (_a = e.target.files) == null ? void 0 : _a[0];
    if (file === void 0 || !profilePictureRenderRef.current)
      return;
    const newUrl = URL.createObjectURL(file);
    profilePictureRenderRef.current.style.backgroundImage = `url(${newUrl})`;
    if (createdUrls.profilePicture !== null) {
      URL.revokeObjectURL(createdUrls.profilePicture);
    }
    createdUrls.profilePicture = newUrl;
  };
  return /* @__PURE__ */ import_react16.default.createElement(import_react15.Form, {
    method: "post",
    className: "max-w-[600px] border-r border-gray-600 min-h-screen",
    encType: "multipart/form-data"
  }, /* @__PURE__ */ import_react16.default.createElement("div", {
    className: "sticky top-0 p-4 bg-black font-bold text-xl shadow bg-opacity-80"
  }, "Edit Profile"), /* @__PURE__ */ import_react16.default.createElement("input", {
    type: "file",
    name: "backgroundPicture",
    hidden: true,
    ref: backgroundPictureInputRef,
    accept: "image/*",
    onChange: onBackgroundPictureInputChange
  }), /* @__PURE__ */ import_react16.default.createElement("input", {
    type: "file",
    name: "profilePicture",
    hidden: true,
    ref: profilePictureInputRef,
    accept: "image/*",
    onChange: onProfilePictureInputChange
  }), /* @__PURE__ */ import_react16.default.createElement("div", {
    className: "h-[200px] bg-texter-gray-dark bg-no-repeat bg-cover",
    ref: backgroundPictureRenderRef,
    style: { backgroundImage: `url(${loaderData.backgroundPictureUrl})` }
  }, /* @__PURE__ */ import_react16.default.createElement("div", {
    className: "h-full bg-black bg-opacity-40 w-full grid place-items-center"
  }, /* @__PURE__ */ import_react16.default.createElement("button", {
    className: "p-2 rounded-full hover:bg-white hover:bg-opacity-10",
    type: "button",
    onClick: onChangeBackgroundPicture
  }, /* @__PURE__ */ import_react16.default.createElement(import_bs4.BsCamera, {
    size: "30px"
  })))), /* @__PURE__ */ import_react16.default.createElement("div", null, /* @__PURE__ */ import_react16.default.createElement("div", {
    className: "w-[150px] h-[150px] bg-texter-blue rounded-full -mt-[75px] ml-4 border-4 border-black bg-no-repeat bg-cover",
    ref: profilePictureRenderRef,
    style: { backgroundImage: `url(${loaderData.profilePictureUrl})` }
  }, /* @__PURE__ */ import_react16.default.createElement("div", {
    className: "bg-black bg-opacity-40 grid place-items-center h-full rounded-full"
  }, /* @__PURE__ */ import_react16.default.createElement("button", {
    className: "p-2 rounded-full hover:bg-white hover:bg-opacity-10",
    type: "button",
    onClick: onChangeProfilePicture
  }, /* @__PURE__ */ import_react16.default.createElement(import_bs4.BsCamera, {
    size: "30px"
  }))))), /* @__PURE__ */ import_react16.default.createElement("div", {
    className: "mx-3 my-8"
  }, /* @__PURE__ */ import_react16.default.createElement("div", {
    className: "max-w-[350px] flex flex-col gap-y-3"
  }, /* @__PURE__ */ import_react16.default.createElement(TexterInput, {
    label: "Username",
    name: "username",
    placeholder: "username",
    type: "text",
    autoFocus: true,
    defaultValue: loaderData.userName
  }), /* @__PURE__ */ import_react16.default.createElement("label", {
    className: "flex flex-col gap-y-6"
  }, /* @__PURE__ */ import_react16.default.createElement("span", {
    className: "text-xl font-bold"
  }, "Bio"), /* @__PURE__ */ import_react16.default.createElement("textarea", {
    className: "bg-inherit w-full py-4 focus:outline-none mb-2 border border-gray-700 focus:border-texter-blue px-2 rounded",
    placeholder: "About yourselves",
    defaultValue: loaderData.bio,
    name: "bio"
  })), /* @__PURE__ */ import_react16.default.createElement("button", {
    type: "submit",
    className: "bg-texter-blue px-4 py-3 rounded-full max-w-[100px] hover:bg-texter-blue-dark"
  }, "Save"))));
}

// route:C:\Users\nivek\Documents\work\texter\app\routes\__navbar\bookmarks.tsx
var bookmarks_exports = {};
__export(bookmarks_exports, {
  default: () => bookmarks_default,
  loader: () => loader4
});
var import_node7 = require("@remix-run/node");
var import_react17 = require("@remix-run/react");
var loader4 = async ({ request, params }) => {
  const loggedInUserId = await getUserId(request);
  const user = await getUserOfUserId(loggedInUserId, "user_id");
  if (user === null) {
    return (0, import_node7.json)({ type: "error", error: "Tweets not found" });
  }
  const { user_id } = user;
  const allLikedTweets = await getTweetsUserHasBookmarked({
    userId: user_id,
    selectQuery: `tweets!fk_tweet_id (
              tweet_id,
              message,
              replied_to,
              users!fk_user_id (
                  user_name,
                  profile_picture_url
              ),
              replies
          )`
  });
  if (allLikedTweets === null) {
    return (0, import_node7.json)({ type: "error", error: "Tweets not found" });
  }
  const convertToCorrectFormat = await Promise.all(allLikedTweets.map(async ({ tweets }) => {
    const likesCount = await getLikeCount({ tweetId: tweets.tweet_id });
    const likeActive = await hasUserLikedTweet({
      userId: loggedInUserId,
      tweetId: tweets.tweet_id
    });
    const bookmarkCount = await getBookmarkCount({
      tweetId: tweets.tweet_id
    });
    const bookmarkActive = await hasUserBookmarkedTweet({
      userId: loggedInUserId,
      tweetId: tweets.tweet_id
    });
    return {
      message: tweets.message,
      tweetId: tweets.tweet_id,
      userName: tweets.users.user_name,
      repliesCount: tweets.replies.length,
      repliedTo: tweets.replied_to === null ? void 0 : await getTweetUserName(tweets.replied_to) ?? void 0,
      likeActive: likeActive ?? false,
      likesCount: likesCount ?? 0,
      bookmarkActive: bookmarkActive ?? false,
      bookmarkCount: bookmarkCount ?? 0,
      profilePictureUrl: tweets.users.profile_picture_url ?? ""
    };
  }));
  return (0, import_node7.json)({ type: "success", tweets: convertToCorrectFormat });
};
function bookmarks_default() {
  const loaderData = (0, import_react17.useLoaderData)();
  if (loaderData.type === "error")
    return /* @__PURE__ */ React.createElement("div", null, loaderData.error);
  return /* @__PURE__ */ React.createElement("div", {
    className: "max-w-[600px] border-r border-gray-600 min-h-screen"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "sticky top-0 p-4 bg-black font-bold text-xl shadow bg-opacity-80"
  }, "Bookmarks"), /* @__PURE__ */ React.createElement("ol", null, loaderData.tweets.map(({
    message,
    repliesCount,
    tweetId,
    userName,
    repliedTo,
    likesCount,
    likeActive,
    bookmarkActive,
    bookmarkCount,
    profilePictureUrl
  }) => {
    return /* @__PURE__ */ React.createElement("li", {
      key: tweetId,
      className: "border-b border-gray-600"
    }, /* @__PURE__ */ React.createElement(Tweet, {
      likesCount,
      message,
      relpiesCount: repliesCount,
      userName,
      tweetId,
      repliedTo,
      likeActive,
      bookmarkActive,
      bookmarkCount,
      profilePictureUrl
    }));
  })));
}

// route:C:\Users\nivek\Documents\work\texter\app\routes\__navbar\$user.tsx
var user_exports = {};
__export(user_exports, {
  default: () => UserPage,
  loader: () => loader5
});
var import_node8 = require("@remix-run/node");
var import_node9 = require("@remix-run/node");
var import_react18 = require("@remix-run/react");
var loader5 = async ({ request, params }) => {
  const loggedInUserId = await getUserId(request);
  if (loggedInUserId === null) {
    const requestUrl = new URL(request.url);
    const searchParams = new URLSearchParams();
    searchParams.set("redirectTo", requestUrl.pathname);
    const finalUrl = `${"/join" /* join */}?${searchParams}`;
    return (0, import_node9.redirect)(finalUrl);
  }
  const userName = params.user;
  invariant(userName, "Expected the route name to be $user");
  const user = await getUserOfUserName(userName, "user_name, user_id, profile_picture_url, background_picture_url, bio");
  if (user === null) {
    return (0, import_node8.json)({ error: "User not found", type: "error" });
  }
  return (0, import_node8.json)({
    userName,
    type: "success",
    backgroundPictureUrl: user.background_picture_url ?? "",
    profilePictureUrl: user.profile_picture_url ?? "",
    bio: user.bio ?? ""
  });
};
function UserPage() {
  const loaderData = (0, import_react18.useLoaderData)();
  const pathNames = (0, import_react18.useLocation)().pathname.split("/");
  if (loaderData.type === "error") {
    return /* @__PURE__ */ React.createElement("div", null, loaderData.error);
  }
  const { userName, backgroundPictureUrl, profilePictureUrl, bio } = loaderData;
  const isTweetActive = decodeURIComponent(pathNames[pathNames.length - 1]) === userName;
  const isTweetAndRepliesActive = pathNames[pathNames.length - 1] === "with_replies";
  const isLikesActive = pathNames[pathNames.length - 1] === "likes";
  const userTweetsUrl = `${"/" /* home */}${userName}`;
  const userTweetsWithRepliesUrl = `${"/" /* home */}${userName}/with_replies`;
  const userLikesTweetsUrl = `${"/" /* home */}${userName}/likes`;
  return /* @__PURE__ */ React.createElement("div", {
    className: "max-w-[600px] border-r border-gray-600 min-h-screen"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "sticky top-0 p-4 bg-black font-bold text-xl shadow bg-opacity-80"
  }, userName), /* @__PURE__ */ React.createElement("div", {
    className: "flex flex-col gap-y-8"
  }, /* @__PURE__ */ React.createElement(UserPicture, {
    profilePictureUrl,
    backgroundPictureUrl
  }), /* @__PURE__ */ React.createElement("div", {
    className: "flex justify-end -mt-[75px] mr-4"
  }, /* @__PURE__ */ React.createElement(import_react18.Link, {
    to: "../edit-profile",
    className: "px-6 py-2 rounded-full border border-texter-gray text-texter-blue hover:border-texter-blue"
  }, "Edit profile")), /* @__PURE__ */ React.createElement("div", {
    className: "ml-4"
  }, /* @__PURE__ */ React.createElement(AboutUser, {
    userName,
    bio
  })), /* @__PURE__ */ React.createElement("ul", {
    className: "flex items-center border-b border-gray-600 text-texter-gray"
  }, /* @__PURE__ */ React.createElement("li", {
    className: "flex-1"
  }, /* @__PURE__ */ React.createElement(TweetOptions2, {
    name: "Tweets",
    to: userTweetsUrl,
    active: isTweetActive
  })), /* @__PURE__ */ React.createElement("li", {
    className: "flex-1"
  }, /* @__PURE__ */ React.createElement(TweetOptions2, {
    name: "Tweets and replies",
    to: userTweetsWithRepliesUrl,
    active: isTweetAndRepliesActive
  })), /* @__PURE__ */ React.createElement("li", {
    className: "flex-1"
  }, /* @__PURE__ */ React.createElement(TweetOptions2, {
    name: "Likes",
    to: userLikesTweetsUrl,
    active: isLikesActive
  }))), /* @__PURE__ */ React.createElement(import_react18.Outlet, null)));
}
var AboutUser = ({ userName, bio }) => {
  return /* @__PURE__ */ React.createElement("div", {
    className: "flex flex-col gap-y-5"
  }, /* @__PURE__ */ React.createElement("h1", {
    className: "font-bold text-xl"
  }, userName), /* @__PURE__ */ React.createElement("p", {
    className: "text-sm"
  }, bio));
};
var UserPicture = ({
  profilePictureUrl,
  backgroundPictureUrl
}) => {
  return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", {
    className: "h-[200px] bg-texter-gray-dark bg-no-repeat bg-cover",
    style: { backgroundImage: `url(${backgroundPictureUrl})` }
  }), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", {
    className: "w-[150px] h-[150px] bg-texter-blue rounded-full -mt-[75px] ml-4 border-4 border-black bg-no-repeat bg-cover",
    style: { backgroundImage: `url(${profilePictureUrl})` }
  })));
};
var TweetOptions2 = ({ name, to, active }) => {
  return /* @__PURE__ */ React.createElement(import_react18.Link, {
    to,
    className: `w-full grid place-items-center hover:bg-gray-900 py-3 ${active ? "text-white" : ""}`
  }, name);
};

// route:C:\Users\nivek\Documents\work\texter\app\routes\__navbar\$user\tweets\$tweetId\bookmark.ts
var bookmark_exports = {};
__export(bookmark_exports, {
  action: () => action3
});
var import_node10 = require("@remix-run/node");
var action3 = async ({ request, params }) => {
  const loggedInUserId = await getUserId(request);
  if (loggedInUserId === null) {
    if (loggedInUserId === null) {
      const requestUrl = new URL(request.url);
      const searchParams = new URLSearchParams();
      searchParams.set("redirectTo", requestUrl.pathname);
      const finalUrl = `${"/join" /* join */}?${searchParams}`;
      return (0, import_node10.redirect)(finalUrl);
    }
  }
  const tweetId = await params.tweetId;
  invariant(tweetId, "Expected the dynamic route to be $tweetId");
  const formData = await request.formData();
  const actionType = formData.get("actionType");
  if (actionType === "bookmark") {
    const result = await userBookmarkedTweet({
      userId: loggedInUserId,
      tweetId
    });
    if (result === null) {
      return (0, import_node10.json)({ error: "Error adding bookmark" });
    }
    return null;
  } else if (actionType === "removeBookmark") {
    const result = await userRemovedBookmarkedTweet({
      tweetId,
      userId: loggedInUserId
    });
    if (result === null) {
      return (0, import_node10.json)({ error: "Error in removing the bookmark" });
    }
    return null;
  } else {
    return (0, import_node10.json)({ error: "Unknown action type" });
  }
};

// route:C:\Users\nivek\Documents\work\texter\app\routes\__navbar\$user\tweets\$tweetId\like.ts
var like_exports = {};
__export(like_exports, {
  action: () => action4
});
var import_node11 = require("@remix-run/node");
var action4 = async ({ request, params }) => {
  const loggedInUserId = await getUserId(request);
  if (loggedInUserId === null) {
    if (loggedInUserId === null) {
      const requestUrl = new URL(request.url);
      const searchParams = new URLSearchParams();
      searchParams.set("redirectTo", requestUrl.pathname);
      const finalUrl = `${"/join" /* join */}?${searchParams}`;
      return (0, import_node11.redirect)(finalUrl);
    }
  }
  const tweetId = await params.tweetId;
  invariant(tweetId, "Expected the dynamic route to be $tweetId");
  const formData = await request.formData();
  const actionType = formData.get("actionType");
  if (actionType === "like") {
    const result = await userLikedTweet({ userId: loggedInUserId, tweetId });
    if (result === null) {
      return (0, import_node11.json)({ error: "Error adding like" });
    }
    return null;
  } else if (actionType === "unlike") {
    const result = await userUnLikedTweet({ tweetId, userId: loggedInUserId });
    if (result === null) {
      return (0, import_node11.json)({ error: "Error in removing the like" });
    }
    return null;
  } else {
    return (0, import_node11.json)({ error: "Unknown action type" });
  }
};

// route:C:\Users\nivek\Documents\work\texter\app\routes\__navbar\$user\with_replies.tsx
var with_replies_exports = {};
__export(with_replies_exports, {
  default: () => TweetsFromUser,
  loader: () => loader6
});
var import_node12 = require("@remix-run/node");
var import_react19 = require("@remix-run/react");
var loader6 = async ({ request, params }) => {
  const loggedInUserId = await getUserId(request);
  if (loggedInUserId === null) {
    const requestUrl = new URL(request.url);
    const searchParams = new URLSearchParams();
    searchParams.set("redirectTo", requestUrl.pathname);
    const finalUrl = `${"/join" /* join */}?${searchParams}`;
    return (0, import_node12.redirect)(finalUrl);
  }
  const userName = params.user;
  invariant(userName, "Expected the dynamic route $user");
  const user = await getUserOfUserName(userName, "*");
  if (user === null) {
    return (0, import_node12.json)({ error: "User not found", type: "error" });
  }
  const { user_id: userId } = user;
  const allTweetsSelectQuery = "tweet_id, message, replied_to, replies, users!fk_user_id(profile_picture_url)";
  const allTweets = await getAllTweetsFromUser({
    userId,
    selectQuery: allTweetsSelectQuery
  });
  if (allTweets === null) {
    return (0, import_node12.json)({ error: "Tweets not found", type: "error" });
  }
  const tweetsWithRepliesCount = await Promise.all(allTweets.map(async (reply) => {
    const repliedTo = reply.replied_to ? await getTweetUserName(reply.replied_to) : null;
    const likesCount = await getLikeCount({ tweetId: reply.tweet_id }) ?? 0;
    const likeActive = await hasUserLikedTweet({
      userId: loggedInUserId,
      tweetId: reply.tweet_id
    }) ?? false;
    const bookmarkCount = await getBookmarkCount({ tweetId: reply.tweet_id }) ?? 0;
    const bookmarkActive = await hasUserBookmarkedTweet({
      userId: loggedInUserId,
      tweetId: reply.tweet_id
    }) ?? false;
    return {
      userName,
      tweetId: reply.tweet_id,
      message: reply.message,
      repliesCount: reply.replies.length,
      repliedTo: repliedTo ?? void 0,
      likesCount,
      likeActive,
      bookmarkCount,
      bookmarkActive,
      profilePictureUrl: reply.users.profile_picture_url ?? ""
    };
  }));
  return (0, import_node12.json)({ type: "success", tweets: tweetsWithRepliesCount });
};
function TweetsFromUser() {
  const loaderData = (0, import_react19.useLoaderData)();
  if (loaderData.type === "error")
    return /* @__PURE__ */ React.createElement("div", null, loaderData.error);
  return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("ol", null, loaderData.tweets.map(({
    message,
    repliesCount,
    tweetId,
    userName,
    repliedTo,
    likesCount,
    likeActive,
    bookmarkActive,
    bookmarkCount,
    profilePictureUrl
  }) => {
    return /* @__PURE__ */ React.createElement("li", {
      key: tweetId,
      className: "border-b border-gray-600"
    }, /* @__PURE__ */ React.createElement(Tweet, {
      likesCount,
      message,
      relpiesCount: repliesCount,
      userName,
      tweetId,
      repliedTo,
      likeActive,
      bookmarkActive,
      bookmarkCount,
      profilePictureUrl
    }));
  })));
}

// route:C:\Users\nivek\Documents\work\texter\app\routes\__navbar\$user\index.tsx
var user_exports2 = {};
__export(user_exports2, {
  default: () => TweetsFromUser2,
  loader: () => loader7
});
var import_node13 = require("@remix-run/node");
var import_react20 = require("@remix-run/react");
var loader7 = async ({ request, params }) => {
  const loggedInUserId = await getUserId(request);
  if (loggedInUserId === null) {
    const requestUrl = new URL(request.url);
    const searchParams = new URLSearchParams();
    searchParams.set("redirectTo", requestUrl.pathname);
    const finalUrl = `${"/join" /* join */}?${searchParams}`;
    return (0, import_node13.redirect)(finalUrl);
  }
  const userName = params.user;
  invariant(userName, "Expected the dynamic route $user");
  const user = await getUserOfUserName(userName, "*");
  if (user === null) {
    return (0, import_node13.json)({ error: "User not found", type: "error" });
  }
  const { user_id: userId } = user;
  const allTweetsSelectQuery = "tweet_id, message, replied_to, replies, users!fk_user_id(profile_picture_url)";
  const allTweets = await getAllTweetsFromUser({
    userId,
    selectQuery: allTweetsSelectQuery,
    includeReplies: false
  });
  if (allTweets === null) {
    return (0, import_node13.json)({ error: "Tweets not found", type: "error" });
  }
  const tweetsWithRepliesCount = await Promise.all(allTweets.map(async (reply) => {
    return {
      userName,
      tweetId: reply.tweet_id,
      message: reply.message,
      repliesCount: reply.replies.length,
      replied_to: void 0,
      likesCount: await getLikeCount({ tweetId: reply.tweet_id }) ?? 0,
      likeActive: await hasUserLikedTweet({
        userId: loggedInUserId,
        tweetId: reply.tweet_id
      }) ?? false,
      bookmarkCount: await getBookmarkCount({ tweetId: reply.tweet_id }) ?? 0,
      bookmarkActive: await hasUserBookmarkedTweet({
        userId: loggedInUserId,
        tweetId: reply.tweet_id
      }) ?? false,
      profilePictureUrl: reply.users.profile_picture_url ?? ""
    };
  }));
  return (0, import_node13.json)({ type: "success", tweets: tweetsWithRepliesCount });
};
function TweetsFromUser2() {
  const loaderData = (0, import_react20.useLoaderData)();
  if (loaderData.type === "error")
    return /* @__PURE__ */ React.createElement("div", null, loaderData.error);
  return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("ol", null, loaderData.tweets.map(({
    message,
    repliesCount,
    tweetId,
    userName,
    repliedTo,
    likesCount,
    likeActive,
    bookmarkActive,
    bookmarkCount,
    profilePictureUrl
  }) => {
    return /* @__PURE__ */ React.createElement("li", {
      key: tweetId,
      className: "border-b border-gray-600"
    }, /* @__PURE__ */ React.createElement(Tweet, {
      likesCount,
      message,
      relpiesCount: repliesCount,
      userName,
      tweetId,
      repliedTo,
      likeActive,
      bookmarkActive,
      bookmarkCount,
      profilePictureUrl
    }));
  })));
}

// route:C:\Users\nivek\Documents\work\texter\app\routes\__navbar\$user\likes.tsx
var likes_exports = {};
__export(likes_exports, {
  default: () => likes_default,
  loader: () => loader8
});
var import_node14 = require("@remix-run/node");
var import_react21 = require("@remix-run/react");
var loader8 = async ({ request, params }) => {
  const loggedInUserId = await getUserId(request);
  const userName = params.user;
  invariant(userName, "Expected route to have a dynamic route $user");
  const user = await getUserOfUserName(userName);
  if (user === null) {
    return (0, import_node14.json)({ type: "error", error: "Tweets not found" });
  }
  const { user_id } = user;
  const allLikedTweets = await getTweetsUserHasLiked({
    userId: user_id,
    selectQuery: `tweets!fk_tweet_id (
        tweet_id,
        message,
        replied_to,
        users!fk_user_id (
            user_name,
            profile_picture_url
        ),
        replies
    )`
  });
  if (allLikedTweets === null) {
    return (0, import_node14.json)({ type: "error", error: "Tweets not found" });
  }
  const convertToCorrectFormat = await Promise.all(allLikedTweets.map(async ({ tweets }) => {
    const likesCount = await getLikeCount({ tweetId: tweets.tweet_id });
    const likeActive = await hasUserLikedTweet({
      userId: loggedInUserId,
      tweetId: tweets.tweet_id
    });
    const bookmarkCount = await getBookmarkCount({
      tweetId: tweets.tweet_id
    });
    const bookmarkActive = await hasUserBookmarkedTweet({
      userId: loggedInUserId,
      tweetId: tweets.tweet_id
    });
    return {
      message: tweets.message,
      tweetId: tweets.tweet_id,
      userName: tweets.users.user_name,
      repliesCount: tweets.replies.length,
      repliedTo: tweets.replied_to === null ? void 0 : await getTweetUserName(tweets.replied_to) ?? void 0,
      likeActive: likeActive ?? false,
      likesCount: likesCount ?? 0,
      bookmarkActive: bookmarkActive ?? false,
      bookmarkCount: bookmarkCount ?? 0,
      profilePictureUrl: tweets.users.profile_picture_url ?? ""
    };
  }));
  return (0, import_node14.json)({ type: "success", tweets: convertToCorrectFormat });
};
function likes_default() {
  const loaderData = (0, import_react21.useLoaderData)();
  if (loaderData.type === "error")
    return /* @__PURE__ */ React.createElement("div", null, loaderData.error);
  return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("ol", null, loaderData.tweets.map(({
    message,
    repliesCount,
    tweetId,
    userName,
    repliedTo,
    likesCount,
    likeActive,
    bookmarkActive,
    bookmarkCount,
    profilePictureUrl
  }) => {
    return /* @__PURE__ */ React.createElement("li", {
      key: tweetId,
      className: "border-b border-gray-600"
    }, /* @__PURE__ */ React.createElement(Tweet, {
      likesCount,
      message,
      relpiesCount: repliesCount,
      userName,
      tweetId,
      repliedTo,
      likeActive,
      bookmarkActive,
      bookmarkCount,
      profilePictureUrl
    }));
  }))));
}

// route:C:\Users\nivek\Documents\work\texter\app\routes\__navbar\index.tsx
var navbar_exports2 = {};
__export(navbar_exports2, {
  action: () => action5,
  default: () => navbar_default,
  loader: () => loader9
});
var import_node15 = require("@remix-run/node");
var import_react24 = require("@remix-run/react");

// app/components/sendTweet.tsx
var import_react22 = require("@remix-run/react");
var import_react23 = require("react");
var SendTweet = ({
  error,
  userUrl,
  profilePictureUrl
}) => {
  const transition = (0, import_react22.useTransition)();
  const formRef = (0, import_react23.useRef)(null);
  const isSubmiting = transition.state === "submitting";
  (0, import_react23.useEffect)(() => {
    var _a;
    if (!isSubmiting) {
      (_a = formRef == null ? void 0 : formRef.current) == null ? void 0 : _a.reset();
    }
  }, [isSubmiting]);
  return /* @__PURE__ */ React.createElement(import_react22.Form, {
    method: "post",
    className: "flex flex-col gap-y-5 py-5",
    ref: formRef
  }, /* @__PURE__ */ React.createElement(TexterTextArea, {
    name: "message",
    placeholder: "Whats Happening?",
    errorMessage: error,
    autoFocus: true,
    label: "Send Tweet",
    userUrl,
    profilePictureUrl
  }), /* @__PURE__ */ React.createElement("div", {
    className: "flex justify-end mr-3"
  }, /* @__PURE__ */ React.createElement("button", {
    type: "submit",
    className: "bg-texter-blue hover:bg-texter-blue-dark px-5 py-2 rounded-full",
    name: "actionType",
    value: "tweet"
  }, "Tweet")));
};

// route:C:\Users\nivek\Documents\work\texter\app\routes\__navbar\index.tsx
var loader9 = async ({ request }) => {
  const loggedInUserId = await getUserId(request);
  if (loggedInUserId === null) {
    const requestUrl = new URL(request.url);
    const searchParams = new URLSearchParams();
    searchParams.set("redirectTo", requestUrl.pathname);
    const finalUrl = `${"/join" /* join */}?${searchParams}`;
    return (0, import_node15.redirect)(finalUrl);
  }
  const loggedInUser = await getUserOfUserId(loggedInUserId, "user_name, profile_picture_url");
  if (loggedInUser === null) {
    const userSession = await getUserSession(request);
    const requestUrl = new URL(request.url);
    const searchParams = new URLSearchParams();
    searchParams.set("redirectTo", requestUrl.pathname);
    const finalUrl = `${"/join" /* join */}?${searchParams}`;
    return (0, import_node15.redirect)(finalUrl, {
      headers: {
        "Set-Cookie": await sessionStorage.destroySession(userSession)
      }
    });
  }
  const { user_name: loggedInUserName } = loggedInUser;
  const latest10Tweets = await getLatestTweets({
    count: 10,
    selectQuery: `message, tweet_id, users!fk_user_id (user_name, profile_picture_url), replied_to, replies`
  });
  if (latest10Tweets === null) {
    return (0, import_node15.json)({
      tweets: [],
      loggedInUserName,
      loggedInProfilePictureUrl: loggedInUser.profile_picture_url ?? ""
    });
  }
  const latestTweetsWithRepliedTo = await Promise.all(latest10Tweets.map(async ({ message, tweet_id, users, replied_to, replies }) => {
    const repliedToPromise = replied_to === null ? null : getTweetUserName(replied_to);
    const likesCountPromise = getLikeCount({ tweetId: tweet_id });
    const likeActivePromise = hasUserLikedTweet({
      userId: loggedInUserId,
      tweetId: tweet_id
    });
    const bookmarkCountPromise = getBookmarkCount({ tweetId: tweet_id });
    const bookmarkActivePromise = hasUserBookmarkedTweet({
      userId: loggedInUserId,
      tweetId: tweet_id
    });
    const [
      repliedTo,
      likesCount,
      likeActive,
      bookmarkCount,
      bookmarkActive
    ] = await Promise.all([
      repliedToPromise,
      likesCountPromise,
      likeActivePromise,
      bookmarkCountPromise,
      bookmarkActivePromise
    ]);
    return {
      message,
      tweetId: tweet_id,
      userName: users.user_name,
      repliedTo: repliedTo ?? void 0,
      repliesCount: replies.length,
      likesCount: likesCount ?? 0,
      likeActive: likeActive ?? false,
      bookmarkCount: bookmarkCount ?? 0,
      bookmarkActive: bookmarkActive ?? false,
      profilePictureUrl: users.profile_picture_url ?? ""
    };
  }));
  return (0, import_node15.json)({
    tweets: latestTweetsWithRepliedTo,
    loggedInUserName,
    loggedInProfilePictureUrl: loggedInUser.profile_picture_url ?? ""
  });
};
var action5 = async ({ request }) => {
  const loggedInUserId = await getUserId(request);
  if (loggedInUserId === null) {
    const requestUrl = new URL(request.url);
    const searchParams = new URLSearchParams();
    searchParams.set("redirectTo", requestUrl.pathname);
    const finalUrl = `${"/join" /* join */}?${searchParams}`;
    return (0, import_node15.redirect)(finalUrl);
  }
  const formData = await request.formData();
  const actionType = formData.get("actionType");
  if (typeof actionType !== "string") {
    return (0, import_node15.json)({ error: "Invalid action type" });
  }
  if (actionType === "tweet") {
    const message = formData.get("message");
    if (!message || typeof message !== "string")
      return (0, import_node15.json)({ error: "Enter a valid message" });
    const insertTweetQuery = await insertTweetFromUser({
      userId: loggedInUserId,
      message
    });
    if (insertTweetQuery === null)
      return (0, import_node15.json)({ error: "Invalid action type" });
    return null;
  }
};
function navbar_default() {
  const { tweets, loggedInUserName, loggedInProfilePictureUrl } = (0, import_react24.useLoaderData)();
  const userUrl = `${"/" /* home */}${loggedInUserName}`;
  const actionData = (0, import_react24.useActionData)();
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", {
    className: "sticky top-0 p-4 bg-black font-bold text-xl shadow bg-opacity-80"
  }, "Home"), /* @__PURE__ */ React.createElement("div", {
    className: "max-w-[600px] border-r border-gray-600 min-h-screen"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "border-b border-gray-600"
  }, /* @__PURE__ */ React.createElement(SendTweet, {
    error: actionData == null ? void 0 : actionData.error,
    userUrl,
    profilePictureUrl: loggedInProfilePictureUrl
  })), /* @__PURE__ */ React.createElement("ol", null, tweets.map(({
    message,
    tweetId,
    userName,
    repliedTo,
    repliesCount,
    likesCount,
    likeActive,
    bookmarkActive,
    bookmarkCount,
    profilePictureUrl
  }, i) => {
    return /* @__PURE__ */ React.createElement("li", {
      key: tweetId,
      className: "border-b border-gray-600"
    }, /* @__PURE__ */ React.createElement(Tweet, {
      message,
      tweetId,
      userName,
      repliedTo,
      relpiesCount: repliesCount,
      likesCount,
      likeActive,
      bookmarkActive,
      bookmarkCount,
      profilePictureUrl
    }));
  }))));
}

// route:C:\Users\nivek\Documents\work\texter\app\routes\logout.tsx
var logout_exports = {};
__export(logout_exports, {
  action: () => action6
});
var import_node16 = require("@remix-run/node");
var action6 = async ({ request }) => {
  const userSession = await getUserSession(request);
  return (0, import_node16.redirect)("/" /* home */, {
    headers: { "Set-Cookie": await sessionStorage.destroySession(userSession) }
  });
};

// route:C:\Users\nivek\Documents\work\texter\app\routes\join.tsx
var join_exports = {};
__export(join_exports, {
  RenderJoinPage: () => RenderJoinPage,
  action: () => action7,
  default: () => JoinPage,
  links: () => links2,
  loader: () => loader10,
  meta: () => meta2
});
var import_node17 = require("@remix-run/node");
var import_node18 = require("@remix-run/node");
var import_react25 = require("@remix-run/react");
var import_bcryptjs = require("bcryptjs");
var import_react26 = __toESM(require("react"));
var import_gr2 = require("react-icons/gr");
var import_ai3 = require("react-icons/ai");

// app/images/twitter-login.png
var twitter_login_default = "/build/_assets/twitter-login-MLRUKNHN.png";

// route:C:\Users\nivek\Documents\work\texter\app\routes\join.tsx
var import_nanoid = require("nanoid");
var loader10 = async ({ request }) => {
  const userId = await getUserId(request);
  const url = new URL(request.url);
  const search = url.searchParams;
  const redirectUrl = search.get("redirectTo") ?? "/" /* home */;
  if (userId !== null) {
    return (0, import_node18.redirect)(redirectUrl);
  }
  return null;
};
var validateUserName = (userName) => {
  if (userName && typeof userName === "string") {
    return null;
  }
  return "Username is required";
};
var validatePassword = (password) => {
  if (password && typeof password === "string") {
    return null;
  }
  return "Password is required";
};
var verifyUserPassword = async (userName, password) => {
  const user = await getUserOfUserName(userName, "user_id, user_name, password_hash");
  if (user === null) {
    return {
      type: "error",
      actionData: {
        userNameError: "Username and password does not match",
        passwordError: "Username and password does not match"
      }
    };
  }
  const isCorrectPassword = await (0, import_bcryptjs.compare)(password, user.password_hash);
  if (!isCorrectPassword) {
    return {
      type: "error",
      actionData: {
        userNameError: "Username and password does not match",
        passwordError: "Username and password does not match"
      }
    };
  }
  return { type: "success", userId: user.user_id };
};
var createUserWithUserNameAndPassword = async (userName, password) => {
  const passwordHash = await (0, import_bcryptjs.hash)(password, 10);
  const userId = await insertUserWithPassword({ userName, passwordHash });
  if (userId === null) {
    return {
      type: "error",
      actionData: {
        userNameError: "Username is not valid",
        passwordError: null
      }
    };
  }
  return { type: "success", userId };
};
var action7 = async ({ request }) => {
  const formdata = await request.formData();
  const userSession = await getUserSession(request);
  const actionType = formdata.get("actionType");
  if (typeof actionType !== "string")
    return (0, import_node17.json)({
      userNameError: "Action type is required",
      passwordError: "Action type is required"
    });
  if (actionType === "guest") {
    for (let i = 0; i < 3; i++) {
      const guestUsername = `user${(0, import_nanoid.nanoid)(6)}`;
      const guestPassword = (0, import_nanoid.nanoid)();
      const actionResult = await createUserWithUserNameAndPassword(guestUsername, guestPassword);
      if (actionResult.type === "error") {
        continue;
      }
      userSession.set("userId", actionResult.userId);
      break;
    }
  } else {
    const formUserName = formdata.get("username");
    const formPassword = formdata.get("password");
    const userNameError = validateUserName(formUserName);
    const passwordError = validatePassword(formPassword);
    if (typeof userNameError === "string" || typeof passwordError === "string")
      return (0, import_node17.json)({ userNameError, passwordError });
    const userName = formUserName;
    const password = formPassword;
    const actionResult = await (actionType === "login" ? verifyUserPassword(userName, password) : createUserWithUserNameAndPassword(userName, password));
    if (actionResult.type === "error") {
      return (0, import_node17.json)(actionResult.actionData);
    }
    userSession.set("userId", actionResult.userId);
  }
  const requestSearchParams = new URL(request.url).searchParams;
  const redirectTo = requestSearchParams.get("redirectTo") ?? "/" /* home */;
  return (0, import_node18.redirect)(redirectTo, {
    headers: {
      "Set-Cookie": await sessionStorage.commitSession(userSession)
    }
  });
};
var meta2 = () => {
  return { title: "Login to texter" };
};
var links2 = () => {
  return [{ href: twitter_login_default, rel: "reload", as: "image" }];
};
function JoinPage() {
  const [currentPage, setCurrentPage] = (0, import_react26.useState)("WELCOME");
  return /* @__PURE__ */ import_react26.default.createElement("div", {
    className: "h-full flex flex-row-reverse flex-wrap"
  }, /* @__PURE__ */ import_react26.default.createElement(RenderJoinPage, {
    currentPage,
    setCurrentPage
  }), /* @__PURE__ */ import_react26.default.createElement("div", {
    className: "min-h-screen bg-texter-blue flex-1 grid place-items-center",
    style: { backgroundImage: `url(${twitter_login_default})` }
  }, /* @__PURE__ */ import_react26.default.createElement(import_gr2.GrTwitter, {
    color: "white",
    size: "360px"
  })));
}
var RenderJoinPage = ({
  currentPage,
  setCurrentPage
}) => {
  if (currentPage === "WELCOME")
    return /* @__PURE__ */ import_react26.default.createElement(JoinWelcome, {
      setCurrentPage
    });
  if (currentPage === "LOGIN")
    return /* @__PURE__ */ import_react26.default.createElement(JoinTexter, {
      setCurrentPage,
      actionType: "login"
    });
  if (currentPage === "SIGN UP")
    return /* @__PURE__ */ import_react26.default.createElement(JoinTexter, {
      setCurrentPage,
      actionType: "signUp"
    });
  return null;
};
var JoinWelcome = ({ setCurrentPage }) => {
  const location = (0, import_react25.useLocation)();
  const onSignIn = (e) => {
    e.preventDefault();
    setCurrentPage("LOGIN");
  };
  const onCreateYourAccount = (e) => {
    e.preventDefault();
    setCurrentPage("SIGN UP");
  };
  return /* @__PURE__ */ import_react26.default.createElement("div", {
    className: "min-h-screen flex-1 min-w-[50vw] grid place-items-center md:block"
  }, /* @__PURE__ */ import_react26.default.createElement("div", {
    className: "h-full py-[36px] px-[36px]"
  }, /* @__PURE__ */ import_react26.default.createElement(import_gr2.GrTwitter, {
    color: "white",
    size: "50px",
    className: "mb-4"
  }), /* @__PURE__ */ import_react26.default.createElement("div", {
    className: "flex flex-col gap-y-10"
  }, /* @__PURE__ */ import_react26.default.createElement("h1", {
    className: "font-bold md:text-7xl text-5xl leading-tight my-10"
  }, "Happening now"), /* @__PURE__ */ import_react26.default.createElement("div", {
    className: "mb-10"
  }, /* @__PURE__ */ import_react26.default.createElement("p", {
    className: "font-bold text-2xl md:text-4xl pb-6"
  }, "Join Texter today"), /* @__PURE__ */ import_react26.default.createElement("div", {
    className: "inline-flex flex-col gap-y-4"
  }, /* @__PURE__ */ import_react26.default.createElement("button", {
    type: "button",
    className: "border-2 border-texter-blue bg-texter-blue rounded-full hover:bg-texter-blue-dark",
    onClick: onCreateYourAccount
  }, /* @__PURE__ */ import_react26.default.createElement("div", {
    className: "md:min-w-[300px] min-h-[40px] inline-grid place-items-center"
  }, "Create your account")), /* @__PURE__ */ import_react26.default.createElement(FormButton, {
    method: "post",
    action: `${location.pathname}${location.search}`,
    type: "submit",
    name: "actionType",
    value: "guest",
    className: "rounded-full border border-gray-300  text-texter-blue hover:border-texter-blue"
  }, /* @__PURE__ */ import_react26.default.createElement("span", {
    className: "min-w-[300px] min-h-[40px] inline-grid place-items-center"
  }, "Log in with a guest account")))), /* @__PURE__ */ import_react26.default.createElement("div", null, /* @__PURE__ */ import_react26.default.createElement("p", {
    className: "text-base font-bold pb-6"
  }, "Already have an account?"), /* @__PURE__ */ import_react26.default.createElement("button", {
    className: "rounded-full border border-gray-300  text-texter-blue hover:border-texter-blue"
  }, /* @__PURE__ */ import_react26.default.createElement("span", {
    className: "min-w-[300px] min-h-[40px] inline-grid place-items-center",
    onClick: onSignIn
  }, "Log in"))))));
};
var JoinTexter = ({ setCurrentPage, actionType }) => {
  const location = (0, import_react25.useLocation)();
  const actionData = (0, import_react25.useActionData)();
  const isLogin = actionType === "login";
  const onCloseClick = (e) => {
    e.preventDefault();
    setCurrentPage("WELCOME");
  };
  return /* @__PURE__ */ import_react26.default.createElement("div", {
    className: "min-h-screen flex-1 min-w-[50vw]"
  }, /* @__PURE__ */ import_react26.default.createElement("div", {
    className: "h-full p-[36px]"
  }, /* @__PURE__ */ import_react26.default.createElement("div", {
    className: "flex items-center mb-16 gap-x-3 "
  }, /* @__PURE__ */ import_react26.default.createElement("button", {
    type: "button",
    className: "rounded-full hover:bg-gray-900 p-2",
    onClick: onCloseClick
  }, /* @__PURE__ */ import_react26.default.createElement(import_ai3.AiOutlineClose, {
    size: "24px",
    className: "fill-gray-400"
  })), /* @__PURE__ */ import_react26.default.createElement("span", {
    className: "font-bold text-2xl"
  }, isLogin ? "Login to texter" : "Create your account")), /* @__PURE__ */ import_react26.default.createElement(import_react25.Form, {
    className: "max-w-[480px]",
    method: "post",
    action: `${location.pathname}${location.search}`
  }, /* @__PURE__ */ import_react26.default.createElement("div", {
    className: "mb-6"
  }, /* @__PURE__ */ import_react26.default.createElement(TexterInput, {
    name: "username",
    type: "text",
    label: "Username",
    placeholder: "Name",
    autoFocus: true,
    error: typeof (actionData == null ? void 0 : actionData.userNameError) === "string",
    errorMessage: (actionData == null ? void 0 : actionData.userNameError) ?? void 0
  })), /* @__PURE__ */ import_react26.default.createElement("div", {
    className: "mb-8"
  }, /* @__PURE__ */ import_react26.default.createElement(TexterInput, {
    name: "password",
    type: "password",
    label: "Password",
    placeholder: "password",
    error: typeof (actionData == null ? void 0 : actionData.passwordError) === "string",
    errorMessage: (actionData == null ? void 0 : actionData.passwordError) ?? void 0
  })), /* @__PURE__ */ import_react26.default.createElement("button", {
    className: "rounded-full bg-texter-blue w-full px-4 py-3 hover:bg-texter-blue-dark",
    type: "submit",
    name: "actionType",
    value: actionType
  }, "Login"))));
};

// server-assets-manifest:@remix-run/dev/assets-manifest
var assets_manifest_default = { "version": "b96ff4b4", "entry": { "module": "/build/entry.client-UO7KUFAR.js", "imports": ["/build/_shared/chunk-NPBQ2ZCD.js", "/build/_shared/chunk-3DG7SVQU.js"] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "module": "/build/root-ITSXM7ZE.js", "imports": void 0, "hasAction": false, "hasLoader": false, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/__navbar": { "id": "routes/__navbar", "parentId": "root", "path": void 0, "index": void 0, "caseSensitive": void 0, "module": "/build/routes/__navbar-CPSQS3XZ.js", "imports": ["/build/_shared/chunk-2K7FUGOX.js", "/build/_shared/chunk-DN27E22N.js", "/build/_shared/chunk-HV32UKZL.js", "/build/_shared/chunk-ZELMLF5Q.js", "/build/_shared/chunk-GFYRDC4I.js", "/build/_shared/chunk-TARWF57N.js"], "hasAction": false, "hasLoader": true, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/__navbar/$user": { "id": "routes/__navbar/$user", "parentId": "routes/__navbar", "path": ":user", "index": void 0, "caseSensitive": void 0, "module": "/build/routes/__navbar/$user-N2JJCSBM.js", "imports": void 0, "hasAction": false, "hasLoader": true, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/__navbar/$user.tweets.$tweetId": { "id": "routes/__navbar/$user.tweets.$tweetId", "parentId": "routes/__navbar", "path": ":user/tweets/:tweetId", "index": void 0, "caseSensitive": void 0, "module": "/build/routes/__navbar/$user.tweets.$tweetId-MFOOSULY.js", "imports": ["/build/_shared/chunk-SSJXAUTN.js", "/build/_shared/chunk-Z4E5AVV6.js", "/build/_shared/chunk-WQ5HYYS2.js"], "hasAction": true, "hasLoader": true, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/__navbar/$user/index": { "id": "routes/__navbar/$user/index", "parentId": "routes/__navbar/$user", "path": void 0, "index": true, "caseSensitive": void 0, "module": "/build/routes/__navbar/$user/index-VIRO7EHK.js", "imports": ["/build/_shared/chunk-Z4E5AVV6.js", "/build/_shared/chunk-WQ5HYYS2.js", "/build/_shared/chunk-DN27E22N.js", "/build/_shared/chunk-HV32UKZL.js", "/build/_shared/chunk-ZELMLF5Q.js", "/build/_shared/chunk-GFYRDC4I.js", "/build/_shared/chunk-TARWF57N.js"], "hasAction": false, "hasLoader": true, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/__navbar/$user/likes": { "id": "routes/__navbar/$user/likes", "parentId": "routes/__navbar/$user", "path": "likes", "index": void 0, "caseSensitive": void 0, "module": "/build/routes/__navbar/$user/likes-FGSHKDEH.js", "imports": ["/build/_shared/chunk-Z4E5AVV6.js", "/build/_shared/chunk-WQ5HYYS2.js", "/build/_shared/chunk-DN27E22N.js", "/build/_shared/chunk-HV32UKZL.js", "/build/_shared/chunk-ZELMLF5Q.js", "/build/_shared/chunk-GFYRDC4I.js", "/build/_shared/chunk-TARWF57N.js"], "hasAction": false, "hasLoader": true, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/__navbar/$user/tweets/$tweetId/bookmark": { "id": "routes/__navbar/$user/tweets/$tweetId/bookmark", "parentId": "routes/__navbar/$user", "path": "tweets/:tweetId/bookmark", "index": void 0, "caseSensitive": void 0, "module": "/build/routes/__navbar/$user/tweets/$tweetId/bookmark-RTUZ7ZBL.js", "imports": void 0, "hasAction": true, "hasLoader": false, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/__navbar/$user/tweets/$tweetId/like": { "id": "routes/__navbar/$user/tweets/$tweetId/like", "parentId": "routes/__navbar/$user", "path": "tweets/:tweetId/like", "index": void 0, "caseSensitive": void 0, "module": "/build/routes/__navbar/$user/tweets/$tweetId/like-LFLBVPID.js", "imports": void 0, "hasAction": true, "hasLoader": false, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/__navbar/$user/with_replies": { "id": "routes/__navbar/$user/with_replies", "parentId": "routes/__navbar/$user", "path": "with_replies", "index": void 0, "caseSensitive": void 0, "module": "/build/routes/__navbar/$user/with_replies-RPPRFTN2.js", "imports": ["/build/_shared/chunk-Z4E5AVV6.js", "/build/_shared/chunk-WQ5HYYS2.js", "/build/_shared/chunk-DN27E22N.js", "/build/_shared/chunk-HV32UKZL.js", "/build/_shared/chunk-ZELMLF5Q.js", "/build/_shared/chunk-GFYRDC4I.js", "/build/_shared/chunk-TARWF57N.js"], "hasAction": false, "hasLoader": true, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/__navbar/bookmarks": { "id": "routes/__navbar/bookmarks", "parentId": "routes/__navbar", "path": "bookmarks", "index": void 0, "caseSensitive": void 0, "module": "/build/routes/__navbar/bookmarks-LYJABZAG.js", "imports": ["/build/_shared/chunk-Z4E5AVV6.js", "/build/_shared/chunk-WQ5HYYS2.js"], "hasAction": false, "hasLoader": true, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/__navbar/edit-profile": { "id": "routes/__navbar/edit-profile", "parentId": "routes/__navbar", "path": "edit-profile", "index": void 0, "caseSensitive": void 0, "module": "/build/routes/__navbar/edit-profile-IXRLY5V3.js", "imports": ["/build/_shared/chunk-QIXHYK6Y.js"], "hasAction": true, "hasLoader": true, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/__navbar/index": { "id": "routes/__navbar/index", "parentId": "routes/__navbar", "path": void 0, "index": true, "caseSensitive": void 0, "module": "/build/routes/__navbar/index-24XLZ5UX.js", "imports": ["/build/_shared/chunk-SSJXAUTN.js", "/build/_shared/chunk-Z4E5AVV6.js", "/build/_shared/chunk-WQ5HYYS2.js"], "hasAction": true, "hasLoader": true, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/join": { "id": "routes/join", "parentId": "root", "path": "join", "index": void 0, "caseSensitive": void 0, "module": "/build/routes/join-6MGBLYNH.js", "imports": ["/build/_shared/chunk-2K7FUGOX.js", "/build/_shared/chunk-QIXHYK6Y.js", "/build/_shared/chunk-WQ5HYYS2.js", "/build/_shared/chunk-HV32UKZL.js", "/build/_shared/chunk-GFYRDC4I.js", "/build/_shared/chunk-TARWF57N.js"], "hasAction": true, "hasLoader": true, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/logout": { "id": "routes/logout", "parentId": "root", "path": "logout", "index": void 0, "caseSensitive": void 0, "module": "/build/routes/logout-MDHE4BTI.js", "imports": void 0, "hasAction": true, "hasLoader": false, "hasCatchBoundary": false, "hasErrorBoundary": false } }, "url": "/build/manifest-B96FF4B4.js" };

// server-entry-module:@remix-run/dev/server-build
var entry = { module: entry_server_exports };
var routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: root_exports
  },
  "routes/__navbar": {
    id: "routes/__navbar",
    parentId: "root",
    path: void 0,
    index: void 0,
    caseSensitive: void 0,
    module: navbar_exports
  },
  "routes/__navbar/$user.tweets.$tweetId": {
    id: "routes/__navbar/$user.tweets.$tweetId",
    parentId: "routes/__navbar",
    path: ":user/tweets/:tweetId",
    index: void 0,
    caseSensitive: void 0,
    module: user_tweets_tweetId_exports
  },
  "routes/__navbar/edit-profile": {
    id: "routes/__navbar/edit-profile",
    parentId: "routes/__navbar",
    path: "edit-profile",
    index: void 0,
    caseSensitive: void 0,
    module: edit_profile_exports
  },
  "routes/__navbar/bookmarks": {
    id: "routes/__navbar/bookmarks",
    parentId: "routes/__navbar",
    path: "bookmarks",
    index: void 0,
    caseSensitive: void 0,
    module: bookmarks_exports
  },
  "routes/__navbar/$user": {
    id: "routes/__navbar/$user",
    parentId: "routes/__navbar",
    path: ":user",
    index: void 0,
    caseSensitive: void 0,
    module: user_exports
  },
  "routes/__navbar/$user/tweets/$tweetId/bookmark": {
    id: "routes/__navbar/$user/tweets/$tweetId/bookmark",
    parentId: "routes/__navbar/$user",
    path: "tweets/:tweetId/bookmark",
    index: void 0,
    caseSensitive: void 0,
    module: bookmark_exports
  },
  "routes/__navbar/$user/tweets/$tweetId/like": {
    id: "routes/__navbar/$user/tweets/$tweetId/like",
    parentId: "routes/__navbar/$user",
    path: "tweets/:tweetId/like",
    index: void 0,
    caseSensitive: void 0,
    module: like_exports
  },
  "routes/__navbar/$user/with_replies": {
    id: "routes/__navbar/$user/with_replies",
    parentId: "routes/__navbar/$user",
    path: "with_replies",
    index: void 0,
    caseSensitive: void 0,
    module: with_replies_exports
  },
  "routes/__navbar/$user/index": {
    id: "routes/__navbar/$user/index",
    parentId: "routes/__navbar/$user",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: user_exports2
  },
  "routes/__navbar/$user/likes": {
    id: "routes/__navbar/$user/likes",
    parentId: "routes/__navbar/$user",
    path: "likes",
    index: void 0,
    caseSensitive: void 0,
    module: likes_exports
  },
  "routes/__navbar/index": {
    id: "routes/__navbar/index",
    parentId: "routes/__navbar",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: navbar_exports2
  },
  "routes/logout": {
    id: "routes/logout",
    parentId: "root",
    path: "logout",
    index: void 0,
    caseSensitive: void 0,
    module: logout_exports
  },
  "routes/join": {
    id: "routes/join",
    parentId: "root",
    path: "join",
    index: void 0,
    caseSensitive: void 0,
    module: join_exports
  }
};
module.exports = __toCommonJS(stdin_exports);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  assets,
  entry,
  routes
});
//# sourceMappingURL=index.js.map
