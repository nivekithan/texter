import { hash } from "bcryptjs";
import { createReadStream } from "fs";
import {
  insertTweetFromUser,
  insertTweetReplyFromUser,
  insertUserWithPassword,
  supabase,
  uploadBackgroundPicture,
  uploadProfilePicture,
} from "~/server/supabase.server";

const sleep = async () => {
  await new Promise((r) => setTimeout(r, 100));
};
(async () => {
  await supabase.storage.createBucket("pictures", { public: true });

  const userSayaniName = "Sayani Bhattacharjee";
  const userSayaniPassword = await hash("sayani", 10);

  const userSaurabhName = "Saurabh";
  const userSaurabhPassword = await hash("saurabh", 10);

  const userArnavGuptaName = "Arnav Gupta 💉💉💉";
  const userArnavGuptaPassword = await hash("arnav", 10);

  const userSayani = await insertUserWithPassword({
    passwordHash: userSayaniPassword,
    userName: userSayaniName,
  });

  await sleep();

  await uploadProfilePicture({
    contentType: "image/jpeg	",
    extension: ".jpg",
    userId: userSayani!,
    file: await createReadStream(
      "./supabase-local/images/sayani-profile-picture.jpg"
    ),
  });

  await sleep();

  await uploadBackgroundPicture({
    contentType: "image/jpeg",
    extension: ".jpg",
    userId: userSayani!,
    file: await createReadStream("./supabase-local/images/sayani-background-picture.jpg"),
  });

  await sleep();

  const userSaurabh = await insertUserWithPassword({
    passwordHash: userSaurabhPassword,
    userName: userSaurabhName,
  });

  await sleep();

  await uploadProfilePicture({
    contentType: "image/jpeg	",
    extension: ".jpg",
    userId: userSaurabh!,
    file: await createReadStream("./supabase-local/images/saurabh-profile-picture.jpg"),
  });

  await sleep();

  await uploadBackgroundPicture({
    contentType: "image/jpeg",
    extension: ".jpg",
    userId: userSaurabh!,
    file: await createReadStream("./supabase-local/images/saurabh-background-picture.jpg"),
  });

  await sleep();

  const userArnavGupta = await insertUserWithPassword({
    userName: userArnavGuptaName,
    passwordHash: userArnavGuptaPassword,
  });

  await sleep();

  await uploadProfilePicture({
    contentType: "image/jpeg	",
    extension: ".jpg",
    userId: userArnavGupta!,
    file: await createReadStream("./supabase-local/images/arnav-gupta-profile-picture.jpg"),
  });

  await sleep();

  await uploadBackgroundPicture({
    contentType: "image/jpeg",
    extension: ".jpg",
    userId: userArnavGupta!,
    file: await createReadStream(
      "./supabase-local/images/arnav-gupta-background-picture.jpg"
    ),
  });

  await sleep();

  const tweetId1 = await insertTweetFromUser({
    message: `Got job offers in Germany 🚀🚀

  Will be moving there.. This is a dream come true 😭

  Little Sayani would be so proud today ❤️🥺

  I started applying to companies in Europe in March, took me roughly 2 months. Will probably share my interview experiences in a 🧵`,
    userId: userSayani!,
  });

  await sleep();

  await insertTweetReplyFromUser({
    repliedTo: tweetId1!.tweet_id,
    message: `Needless to say, but I was able to prepare for it, thanks to the unending support from
  @championswimmer
   and my friends who took mock interviews, did code reviews, taught me whenever I couldn't solve something, and never gave up on me 🤗`,
    userId: userSayani!,
  });

  await sleep();

  await insertTweetReplyFromUser({
    repliedTo: tweetId1!.tweet_id,
    message: "Yay congratulationssss 🥳",
    userId: userSaurabh!,
  });

  await sleep();

  await insertTweetFromUser({
    message: `CEO: We are building a premium product

  Art Director: Time to take out the black and gold-gradient palette

  Creative Head: Ok what is the most unpronounceable Spanish/French spelling of our product

  CTO: Time to build an invite system.

  Sales Team: *yawn* we'll be needed later`,
    userId: userArnavGupta!,
  });

  await sleep();

  await insertTweetFromUser({
    message: `This generation types "😂" and "😭" with a straight face. We're unreal and indestructible`,
    userId: userArnavGupta!,
  });

  await sleep();

  await insertTweetFromUser({
    message: `Been teaching people to code, starting from college undergrads, to later final year / job market folks, to now very senior, late career engineers too.

  Pretty interesting how the advice goes from

  write more code
  to
  write readable code
  to
  write less code
  to
  don't write code
  😅`,
    userId: userArnavGupta!,
  });
})();
