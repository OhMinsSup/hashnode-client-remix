import { Agent } from "~/services/agent/agent";
import type {
  SignupHandler,
  SigninHandler,
  GetMeHandler,
  UserUpdateHandler,
  UserDeleteHandler,
  PostCreateHandler,
  PostUpdateHandler,
  PostDeleteHandler,
  GetDraftPostListHandler,
  GetLikePostListHandler,
  GetPostListHandler,
  GetTopPostListHandler,
  GetPostHandler,
  GetTagListHandler,
  GetTagHandler,
  GetUserListHandler,
  GetNotificationCountHandler,
  GetTagIdHandler,
  PostTagFollowHandler,
} from "~/services/agent/client/types";

export class HashnodeAgent extends Agent {
  get app() {
    return this.api.app;
  }

  // auth

  signupHandler: SignupHandler = (body, opts) => {
    return this.api.app.auth.signup(body, opts);
  };

  signinHandler: SigninHandler = (body, opts) => {
    return this.api.app.auth.signin(body, opts);
  };

  // users

  getMeHandler: GetMeHandler = (opts) => {
    return this.api.app.users.getMe(opts);
  };

  putMeHandler: UserUpdateHandler = (body, opts) => {
    return this.api.app.users.update(body, opts);
  };

  deleteMeHandler: UserDeleteHandler = (opts) => {
    return this.api.app.users.delete(opts);
  };

  getUserListHandler: GetUserListHandler = (params, opts) => {
    return this.api.app.users.getUserList(params, opts);
  };

  // posts

  postCreateHandler: PostCreateHandler = (body, opts) => {
    return this.api.app.posts.create(body, opts);
  };

  postUpdateHandler: PostUpdateHandler = (id, body, opts) => {
    return this.api.app.posts.update(id, body, opts);
  };

  postDeleteHandler: PostDeleteHandler = (id, opts) => {
    return this.api.app.posts.delete(id, opts);
  };

  getPostHandler: GetPostHandler = (id, opts) => {
    return this.api.app.posts.getPost(id, opts);
  };

  getPostListHandler: GetPostListHandler = (params, opts) => {
    return this.api.app.posts.getPosts(params, opts);
  };

  getTopPostListHandler: GetTopPostListHandler = (params, opts) => {
    return this.api.app.posts.getTopPosts(params, opts);
  };

  getLikePostListHandler: GetLikePostListHandler = (params, opts) => {
    return this.api.app.posts.getLikedPosts(params, opts);
  };

  getDraftPostListHandler: GetDraftPostListHandler = (params, opts) => {
    return this.api.app.posts.getDraftPosts(params, opts);
  };

  // tags

  getTagListHandler: GetTagListHandler = (params, opts) => {
    return this.api.app.tags.getTags(params, opts);
  };

  getTagHandler: GetTagHandler = (name, opts) => {
    return this.api.app.tags.getTag(name, opts);
  };

  getTagIdHandler: GetTagIdHandler = (name, opts) => {
    return this.api.app.tags.getTagId(name, opts);
  };

  postTagFollowHandler: PostTagFollowHandler = (body, opts) => {
    return this.api.app.tags.follow(body, opts);
  };

  // notifications

  getNotificationCountHandler: GetNotificationCountHandler = (opts) => {
    return this.api.app.notifications.getCount(opts);
  };
}
