import express, { response } from "express";
import cookie from "cookie";
import jwt from "jsonwebtoken";
import entryModel from "../models/entryModel.js";
const router = express.Router();

router.get("/test", (req, res) => {
  res.json("test");
});

router.post("/add", async (req, res) => {
  try {
    const cookies = cookie.parse(req.headers.cookie || "");
    const { token } = cookies || null;
    if (!token) {
      return res.status(400).json("Forbidden");
    }

    const decodedToken = await jwt.verify(token, process.env.PRIVATE_KEY, {});

    const { username, id } = decodedToken;
    const { productName, purchasingPrice, sellingPrice, salesCharges, qty } =
      req.body;
    const purchasingPriceFlt = parseFloat(purchasingPrice);
    const sellingPriceFlt = parseFloat(sellingPrice);
    const salesChargesFlt = parseFloat(salesCharges);
    const qtyFlt = parseInt(qty);
    const salesmanCharges = salesChargesFlt * qtyFlt;
    const totalPurchasePrice = purchasingPriceFlt * qtyFlt;
    const totalSellingPrice = sellingPriceFlt * qtyFlt;
    const totalProfit =
      totalSellingPrice - totalPurchasePrice - salesmanCharges;

    const entry = await entryModel.create({
      productName,
      salesmanName: username,
      purchasingPrice: purchasingPriceFlt,
      sellingPrice: sellingPriceFlt,
      salesCharges: salesChargesFlt,
      quantity: qtyFlt,
      totalSalesCharges: salesmanCharges,
      totalPurchasingPrice: totalPurchasePrice,
      totalSellingPrice,
      totalProfit,
    });
    res.json("Entry has been added Sucessfully");
  } catch (error) {
    res.status(500).json("Internal Server Error");
    // console.log(error);
  }
});

router.get("/show", async (req, res) => {
  const pageNo = parseInt(req.query.page) || 1;
  const limit = 10;
  const skip = (pageNo - 1) * limit;
  try {
    const data = await entryModel
      .find()
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 })
      .exec();
    // console.log(data);
    const totalCount = await entryModel.countDocuments();
    // console.log(totalCount);
    res.json({
      data,
      currentPage: pageNo,
      totalPages: Math.ceil(totalCount / limit),
      totalCount: totalCount,
    });
  } catch (error) {
    // console.log(error);
    res.status(500).json("Internal Server Error");
  }
});

router.post("/delete", async (req, res) => {
  const { id } = req.body;
  if (id) {
    try {
      const respnose = await entryModel.findByIdAndDelete(id).exec();
      // console.log(respnose);
      res.json(respnose);
    } catch (error) {
      res.status(500).json("Internal Server Error");
      // console.log(error);
    }
  }
});

router.get("/show-by-id/:id", async (req, res) => {
  const id = req.params.id;
  // res.json(id);
  if (!id) {
    return res.status(400).json("There is no information");
  }
  try {
    const response = await entryModel.findById(id).exec();
    console.log(response);
    if (!response) {
      return res.status(400).json("There is no information");
    }
    const sendingResponse = {
      productName: response.productName,
      purchasingPrice: response.purchasingPrice,
      sellingPrice: response.sellingPrice,
      salesCharges: response.salesCharges,
      quantity: response.quantity,
    };
    res.json(sendingResponse);
  } catch (error) {
    res.status(500).json("Something went wrong");
  }
});

router.post("/edit", async (req, res) => {
  const data = req.body;
  if (!data) {
    return res.status(400).json("Something Went Wrong");
  }
  try {
    const purchasingPriceFlt = parseFloat(data.purchasingPrice);
    const sellingPriceFlt = parseFloat(data.sellingPrice);
    const salesChargesFlt = parseFloat(data.salesCharges);
    const qtyFlt = parseInt(data.qty);
    const salesmanCharges = salesChargesFlt * qtyFlt;
    const totalPurchasePrice = purchasingPriceFlt * qtyFlt;
    const totalSellingPrice = sellingPriceFlt * qtyFlt;
    const stotalProfit = totalSellingPrice - totalPurchasePrice;
    const totalProfit = stotalProfit - salesmanCharges;

    const response = await entryModel.findByIdAndUpdate(data.id, {
      productName: data.productName,
      purchasingPrice: purchasingPriceFlt,
      sellingPrice: sellingPriceFlt,
      salesCharges: salesChargesFlt,
      quantity: qtyFlt,
      totalSalesCharges: salesmanCharges,
      totalPurchasingPrice: totalPurchasePrice,
      totalSellingPrice,
      totalProfit,
    });
    res.json(response);
  } catch (error) {
    res.status(500).json("Internal server Error");
    console.log(error);
  }
});

export default router;
