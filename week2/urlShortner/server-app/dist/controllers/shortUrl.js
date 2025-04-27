"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUrl = exports.getUrl = exports.getAllUrls = exports.createUrl = void 0;
const shortUrl_1 = require("../model/shortUrl");
const createUrl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { fullUrl } = req.body;
        const urlFound = yield shortUrl_1.urlModel.find({ fullUrl });
        if (urlFound.length > 0) {
            res.status(409);
            res.send(urlFound);
        }
        else {
            const shortUrl = yield shortUrl_1.urlModel.create({
                fullUrl,
            });
            res.status(201).json({
                msg: "data created",
                url: shortUrl,
            });
        }
    }
    catch (err) {
        console.error("Error in createUrl:", err);
        res.status(500).send({ message: "Something wrong" });
    }
});
exports.createUrl = createUrl;
const getAllUrls = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const shortUrls = yield shortUrl_1.urlModel.find();
        if (shortUrls.length < 0) {
            res.status(404).send({ message: "Shorturls not found." });
        }
        else {
            res.status(200).send(shortUrls);
        }
    }
    catch (error) {
        res.status(500).send({ message: "Something wrong" });
    }
});
exports.getAllUrls = getAllUrls;
const getUrl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const shortUrl = yield shortUrl_1.urlModel.findOne({ shortUrl: req.params.id });
        if (!shortUrl) {
            res.status(404).send({
                message: "FullUrl not found",
            });
        }
        else {
            shortUrl.clicks++;
            shortUrl.save();
            res.redirect(`${shortUrl.fullUrl}`);
        }
    }
    catch (err) {
        console.error("Error in createUrl:", err);
        res.status(500).send({ message: "Something wrong" });
    }
});
exports.getUrl = getUrl;
const deleteUrl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const shortUrl = yield shortUrl_1.urlModel.findByIdAndDelete({ _id: req.params.id });
        if (shortUrl) {
            res.status(200).send({
                message: "Succesfully deleted.",
            });
        }
    }
    catch (err) {
        console.error("Error in createUrl:", err);
        res.status(500).send({ message: "Something wrong" });
    }
});
exports.deleteUrl = deleteUrl;
