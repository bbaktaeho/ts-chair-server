import User, { associate as associateUser } from "./user";
// import Comment, { associate as associateCommnet } from "./comment";
// import Hashtag, { associate as associateHashtag } from "./hashtag";
// import Post, { associate as associatePost } from "./post";
// import Image, { associate as associateImage } from "./image";
export * from "./sequelize"; // 임포트 함과 동시에 수출

export const db = {
  User,
  //   Comment,
  //   Hashtag,
  //   Post,
  //   Image,
};

export type dbType = typeof db;

associateUser(db);
// associateCommnet(db);
// associateImage(db);
// associatePost(db);
// associateHashtag(db);
//
