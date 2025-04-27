import express from "express";
import { urlModel } from "../model/shortUrl";

export const createUrl = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { fullUrl } = req.body;
    const urlFound = await urlModel.find({ fullUrl });
    if (urlFound.length > 0) {
      res.status(409);
      res.send(urlFound);
    } else {
      const shortUrl = await urlModel.create({
        fullUrl,
      });
      res.status(201).json({
        msg: "data created",
        url: shortUrl,
      });
    }
  } catch (err) {
    console.error("Error in createUrl:", err);
    res.status(500).send({ message: "Something wrong" });
  }
};

export const getAllUrls = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const shortUrls = await urlModel.find();
    if (shortUrls.length < 0) {
      res.status(404).send({ message: "Shorturls not found." });
    } else {
      res.status(200).send(shortUrls);
    }
  } catch (error) {
    res.status(500).send({ message: "Something wrong" });
  }
};

export const getUrl = async (req: express.Request, res: express.Response) => {
  try {
    const shortUrl = await urlModel.findOne({ shortUrl: req.params.id });
    if (!shortUrl) {
      res.status(404).send({
        message: "FullUrl not found",
      });
    } else {
      shortUrl.clicks++;
      shortUrl.save();
      res.redirect(`${shortUrl.fullUrl}`);
    }
  } catch (err) {
    console.error("Error in createUrl:", err);
    res.status(500).send({ message: "Something wrong" });
  }
};

export const deleteUrl = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const shortUrl = await urlModel.findByIdAndDelete({ _id: req.params.id });
    if (shortUrl) {
      res.status(200).send({
        message: "Succesfully deleted.",
      });
    }
  } catch (err) {
    console.error("Error in createUrl:", err);
    res.status(500).send({ message: "Something wrong" });
  }
};
