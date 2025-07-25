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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookRoutes = void 0;
const express_1 = __importDefault(require("express"));
const book_models_1 = require("../models/book.models");
exports.bookRoutes = express_1.default.Router();
exports.bookRoutes.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const data = yield book_models_1.Book.create(body);
        res.status(200).json({
            success: true,
            message: "Book created successfully",
            data
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error',
            error
        });
    }
}));
exports.bookRoutes.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { filter, sortBy = 'createdAt', sort = 'asc', limit = '20' } = req.query;
        const query = {};
        if (filter) {
            query.genre = filter;
        }
        const sortOption = {};
        sortOption[sortBy] = sort === 'desc' ? -1 : 1;
        const data = yield book_models_1.Book.find(query)
            .sort(sortOption)
            .limit(parseInt(limit, 20));
        res.status(200).json({
            success: true,
            message: "Books retrieved successfully",
            data
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Books Can not be retrieved',
            error
        });
    }
}));
exports.bookRoutes.get('/:bookId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookId = req.params.bookId;
        const data = yield book_models_1.Book.findById(bookId);
        res.status(200).json({
            success: true,
            message: "Book retrieved successfully",
            data
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Books Can not be retrieved',
            error
        });
    }
}));
exports.bookRoutes.put('/:bookId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookId = req.params.bookId;
        const updatebody = req.body;
        const data = yield book_models_1.Book.findByIdAndUpdate(bookId, updatebody, { new: true });
        if (!data) {
            return res.status(404).json({
                success: false,
                message: 'Book not found',
            });
        }
        data.updateAvailability();
        yield data.save();
        res.status(200).json({
            success: true,
            message: "Book updated successfully",
            data
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Books Can not be updated',
            error
        });
    }
}));
exports.bookRoutes.delete('/:bookId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookId = req.params.bookId;
        const data = yield book_models_1.Book.findByIdAndDelete(bookId);
        res.status(200).json({
            success: true,
            message: "Book deleted successfully",
            data
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Books Can not be deleted',
            error
        });
    }
}));
