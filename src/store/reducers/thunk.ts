import {createAsyncThunk} from "@reduxjs/toolkit";
import {API_KEY, API_URL} from "../../config.ts";
import {IGoodsItemProp} from "../../types/Types.ts";


export const fetchGoods =  createAsyncThunk<IGoodsItemProp[], void>(
	"shop/fetchGoods",
	async (_, { rejectWithValue }) => {
		try {
			const responce = await fetch(API_URL, {
				headers: {
					'Authorization': API_KEY
				}
			});
			if (!responce.ok) {
				// throw new Error("Server error!");
				return rejectWithValue('Nothing was found.');
			}
			const data = await responce.json();
			return data.shop as IGoodsItemProp[];
		} catch (error) {
			console.log(error)
			return rejectWithValue('Network error');
		}
	}
);