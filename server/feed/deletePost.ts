/* eslint-disable consistent-return */
import { RequestHandler } from 'express';
import { rmSync } from 'fs';
import path from 'path';
import db from '../database/database';
import {
  arrCallback,
  numCallback,
  singleCallback,
} from '../shared/nedbPromises';

const deletePost: RequestHandler = async (req, res) => {
  const { postId } = req.params;
  const { withMedia } = req.body;

  if (!postId) {
    return res.status(501).send();
  }

  try {
    if (!withMedia) {
      const num = await new Promise<number>((resolve, reject) => {
        db.feed.remove({ _id: postId }, numCallback(resolve, reject));
      });
      if (num === 0) return res.status(404).send();
    } else {
      const post = await new Promise<any>((resolve, reject) => {
        db.feed.findOne(
          { _id: postId },
          { mediaIds: 1, mediaSrc: 1 },
          singleCallback(resolve, reject)
        );
      });

      let media;
      let toRemoveIds: string[];

      if (post.mediaSrc) {
        media = [{ mediaSrc: post.mediaSrc }];
        toRemoveIds = [postId];
      } else {
        media = await new Promise<any[]>((resolve, reject) => {
          db.feed.find(
            { _id: { $in: post.mediaIds }, type: 'media' },
            { mediaSrc: 1 },
            arrCallback(resolve, reject)
          );
        });
        toRemoveIds = [...media.map(({ _id }) => _id), postId];
      }

      await new Promise<number>((resolve, reject) => {
        db.feed.remove(
          { _id: { $in: toRemoveIds } },
          { multi: true },
          numCallback(resolve, reject)
        );
      });

      media.forEach(({ mediaSrc }) => {
        rmSync(path.join(__dirname, `../${mediaSrc}`));
      });
    }
    res.status(200).send();
  } catch (err) {
    return res.status(500).send();
  }
};

export default deletePost;
