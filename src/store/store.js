import { configureStore } from '@reduxjs/toolkit'
import authSlice from '../reducers/authSlice/authSlice'
import productSlice from '../reducers/productSlice/productSlice'
import subCategorySlice from '../reducers/subCategorylice/subCategorySlice'
import categorySlice from '../reducers/categorySlice/categorySlice'
import colorSlice from '../reducers/colorSlice/colorSlice'
import brandSlice from '../reducers/brandSlice/brandSlice'
import accountSlice from '@/reducers/accountSlice/accountSlice'

export const store = configureStore({
  reducer: {
    authSlice,
    productSlice,
    subCategorySlice,
    categorySlice,
    colorSlice,
    brandSlice,
    accountSlice,
  },
})