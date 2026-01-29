import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  deleteProduct,
  getProduct,
  postImagesToProduct,
  postProduct,
  putProduct,
} from "../../api/products/productAPI";
import { API_IMG } from "../../utils/url";
import { getSubCategory } from "../../api/subCategoryAPI/subCategoryAPI";
import { getBrand } from "@/api/brandAPI/brandAPI";
import { getColor } from "@/api/colorAPI/colorAPI";

import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Typography,
  Button,
  Input,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";

import {
  InformationCircleIcon,
  PencilIcon,
  TrashIcon,
  ShoppingCartIcon,
  PlusIcon,
  PhotoIcon,
} from "@heroicons/react/24/solid";
import toast from "react-hot-toast";

const toHex = (v = "") => {
  if (!v) return "#111827";
  if (v.includes("%")) {
    const hex = v.replace("%", "#");
    return hex.length > 7 ? `#${hex.slice(2)}` : hex;
  }
  return v.replace("%", "#");
};

const textColorForBg = (hex) => {
  const h = (hex || "#111827").replace("#", "");
  const full =
    h.length === 3
      ? h
          .split("")
          .map((c) => c + c)
          .join("")
      : h;
  const r = parseInt(full.slice(0, 2), 16) || 0;
  const g = parseInt(full.slice(2, 4), 16) || 0;
  const b = parseInt(full.slice(4, 6), 16) || 0;
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return yiq >= 150 ? "#0f172a" : "#ffffff";
};

const Products = () => {
  const [modalEdit, setModalEdit] = useState(null);
  const [base, setBase] = useState([]);
  const [search, setSearch] = useState("");

  const dispatch = useDispatch();
  const { products } = useSelector((store) => store.productSlice);
  const { brand } = useSelector((store) => store.brandSlice);
  const { color } = useSelector((store) => store.colorSlice);
  const { subCategory } = useSelector((store) => store.subCategorySlice);

  const addProductSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();

    for (let i = 0; i < e.target.images.files.length; i++) {
      formData.append("Images", e.target.images.files[i]);
    }

    formData.append("ProductName", e.target.productName.value);
    formData.append("Description", e.target.description.value);
    formData.append("Quantity", e.target.quantity.value);
    formData.append("Code", "qwer" + Date.now());
    formData.append("Price", e.target.price.value);
    formData.append("HasDiscount", e.target.hasDiscount.value);
    formData.append("DiscountPrice", e.target.discountPrice.value);
    formData.append("SubCategoryId", e.target.subCategoryId.value);
    formData.append("BrandId", e.target.brandId.value);
    formData.append("ColorId", e.target.colorId.value);
    formData.append("Size", Math.random() * 10);
    formData.append("Weight", Math.random() * 10);

    dispatch(postProduct(formData));
    e.target.reset();
    setBase([]);
  };

  const editFunc = (p) => {
    const elem = { ...p };
    delete elem.image;
    setModalEdit(elem);
  };

  const addImage = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("ProductId", e.target.id.value);

    for (let i = 0; i < e.target.newImage.files.length; i++) {
      formData.append("Files", e.target.newImage.files[i]);
    }

    dispatch(postImagesToProduct(formData));
    e.target.reset();
  };
  const onPickEditImage = async (files) => {
    const arr = Array.from(files || []);
    if (!arr.length) return;

    const images = await Promise.all(
      arr.map(
        (file) =>
          new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => resolve(e.target.result);
            reader.onerror = reject;
            reader.readAsDataURL(file);
          }),
      ),
    );

    setBase(images);
  };

  const editProductSubmit = (e) => {
    e.preventDefault();
    const obj = {
      Id: modalEdit?.id,
      ProductName: e.target.editProductName.value,
      Description: e.target.editDescription.value,
      Quantity: e.target.editQuantity.value,
      Code: "qwer" + Date.now(),
      Price: e.target.editPrice.value,
      Size: Math.random() * 10,
      Weight: Math.random() * 10,
      HasDiscount: e.target.editHasDiscount.value,
      DiscountPrice: e.target.editDiscountPrice.value,
      SubCategoryId: e.target.editSubCategoryId.value,
      BrandId: e.target.editBrandId.value,
      ColorId: e.target.editColorId.value,
    };

    dispatch(putProduct(obj));
    setModalEdit(null);
  };

  useEffect(() => {
    dispatch(getProduct());
    dispatch(getSubCategory());
    dispatch(getBrand());
    dispatch(getColor());
  }, [dispatch]);
  return (
    <div className="min-h-[calc(100vh-64px)] px-4 py-6">
      <div className="mx-auto max-w-7xl">
        <Card className="mb-8 border border-blue-gray-100 shadow-sm">
          <CardBody className="p-6">
            {base.length ? (
              <div className="flex flex-wrap gap-3">
                {base.map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt={`preview-${i}`}
                    className="h-[100px] w-[100px] rounded-lg object-cover border"
                  />
                ))}
              </div>
            ) : (
              <div className="w-full py-20 rounded-xl bg-gray-200 text-center">
                NO IMAGES YET
              </div>
            )}

            <div className="flex items-end justify-between gap-3">
              <div>
                <Typography className="text-xl font-bold text-blue-gray-900">
                  Add Product
                </Typography>
                <Typography variant="small" className="text-blue-gray-500">
                  Upload images and fill product details.
                </Typography>
              </div>

              <div className="flex flex-col lg:flex-row gap-4">
                <div className="w-full">
                  <Input
                    onChange={(e) => setSearch(e.target.value)}
                    label="Search"
                  />
                </div>
                <Button
                  variant="outlined"
                  className="w-full"
                  onClick={() => dispatch(getProduct())}
                  type="button"
                >
                  Refresh
                </Button>
              </div>
            </div>

            <form
              onSubmit={addProductSubmit}
              className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"
            >
              <div className="lg:col-span-3">
                <label className="mb-2 block text-sm font-medium text-blue-gray-700">
                  Images
                </label>
                <div className="rounded-xl border border-blue-gray-100 bg-blue-gray-50 p-4">
                  <input
                    name="images"
                    multiple
                    type="file"
                    className="w-full"
                    onChange={(e) => onPickEditImage(e.target.files)}
                  />
                  <Typography
                    variant="small"
                    className="mt-2 text-blue-gray-500 flex items-center gap-2"
                  >
                    <PhotoIcon className="h-4 w-4" />
                    You can upload multiple images.
                  </Typography>
                </div>
              </div>

              <Input name="productName" label="Product name" />
              <Input name="quantity" label="Quantity" type="number" />
              <Input name="price" label="Price" type="number" />

              <div className="md:col-span-2 lg:col-span-3">
                <Input name="description" label="Description" />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-blue-gray-700">
                  Discount
                </label>
                <select
                  name="hasDiscount"
                  className="w-full rounded-lg border border-blue-gray-200 bg-white px-3 py-2 text-sm outline-none focus:border-gray-900"
                  defaultValue="false"
                >
                  <option value="true">true</option>
                  <option value="false">false</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-blue-gray-700">
                  Discount Price
                </label>
                <Input
                  name="discountPrice"
                  label="Discount price"
                  type="number"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-blue-gray-700">
                  Subcategory
                </label>
                <select
                  name="subCategoryId"
                  className="w-full rounded-lg border border-blue-gray-200 bg-white px-3 py-2 text-sm outline-none focus:border-gray-900"
                >
                  {subCategory?.map((e) => (
                    <option key={e.id} value={e.id}>
                      {e.subCategoryName}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-blue-gray-700">
                  Brand
                </label>
                <select
                  name="brandId"
                  className="w-full rounded-lg border border-blue-gray-200 bg-white px-3 py-2 text-sm outline-none focus:border-gray-900"
                >
                  {brand?.map((e) => (
                    <option key={e.id} value={e.id}>
                      {e.brandName}
                    </option>
                  ))}
                </select>
              </div>

              <div className="md:col-span-2 lg:col-span-1">
                <label className="mb-2 block text-sm font-medium text-blue-gray-700">
                  Color
                </label>
                <select
                  name="colorId"
                  className="w-full rounded-lg border border-blue-gray-200 bg-white px-3 py-2 text-sm outline-none focus:border-gray-900"
                >
                  {color?.map((e) => {
                    const hex = toHex(e.colorName);
                    const fg = textColorForBg(hex);
                    return (
                      <option
                        key={e.id}
                        value={e.id}
                        style={{ backgroundColor: hex, color: fg }}
                      >
                        {hex}
                      </option>
                    );
                  })}
                </select>
              </div>

              <div className="lg:col-span-3">
                <Button
                  type="submit"
                  className="w-full bg-blue-gray-900 flex items-center justify-center gap-2"
                >
                  <PlusIcon className="h-4 w-4" />
                  Add Product
                </Button>
              </div>
            </form>
          </CardBody>
        </Card>

        <Typography className="mb-6 text-2xl font-bold text-blue-gray-900">
          Products
        </Typography>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products
            ?.filter((e) =>
              e?.productName
                .toLowerCase()
                .includes(search.toLowerCase().trim()),
            )
            .map((e) => (
              <Card
                key={e?.id}
                className="border border-blue-gray-100 hover:shadow-md transition-all overflow-hidden"
              >
                <CardHeader floated={false} shadow={false} className="m-0 p-0">
                  <div className="relative h-52 w-full">
                    <img
                      src={`${API_IMG}/${e?.image}`}
                      alt={e?.productName}
                      className="w-full h-full object-contain"
                    />
                  </div>
                </CardHeader>

                <CardBody className="p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <Typography className="font-semibold text-blue-gray-900 truncate">
                        {e?.productName}
                      </Typography>
                    </div>

                    <div className="flex flex-col items-end gap-2">
                      <span className="rounded-lg border border-blue-gray-100 bg-blue-gray-50 px-2.5 py-1 text-xs font-semibold text-blue-gray-700">
                        ${e?.price}
                      </span>
                      {e?.hasDiscount ? (
                        <span className="rounded-lg border border-red-100 bg-red-50 px-2.5 py-1 text-xs font-semibold text-red-700">
                          - ${e?.discountPrice}
                        </span>
                      ) : null}
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-3">
                    <div className="rounded-xl border border-blue-gray-100 p-3">
                      <Typography
                        variant="small"
                        className="text-blue-gray-500"
                      >
                        Qty
                      </Typography>
                      <Typography className="font-semibold text-blue-gray-900">
                        {e?.quantity}
                      </Typography>
                    </div>
                    <div className="rounded-xl border border-blue-gray-100 p-3">
                      <Typography
                        variant="small"
                        className="text-blue-gray-500"
                      >
                        Category
                      </Typography>
                      <Typography className="font-semibold text-blue-gray-900 truncate">
                        {e?.categoryName}
                      </Typography>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div
                        className="h-5 w-5 rounded-full border border-blue-gray-100"
                        style={{ background: `${e?.color}` }}
                      />
                      <Typography
                        variant="small"
                        className="text-blue-gray-500"
                      >
                        Color
                      </Typography>
                    </div>

                    <form
                      onSubmit={addImage}
                      className="flex items-center gap-2"
                    >
                      <input
                        type="file"
                        name="newImage"
                        multiple
                        className="w-[140px] text-sm"
                      />
                      <input
                        type="text"
                        name="id"
                        defaultValue={e.id}
                        className="hidden"
                      />
                      <Button
                        type="submit"
                        size="sm"
                        variant="outlined"
                        className="flex items-center gap-2"
                      >
                        <PhotoIcon className="h-4 w-4" />
                        Add
                      </Button>
                    </form>
                  </div>
                </CardBody>

                <CardFooter className="p-4 pt-0">
                  <div className="grid lg:grid-cols-3 gap-2">
                    <Button
                      size="sm"
                      className="bg-blue-gray-900 flex items-center justify-center gap-2"
                      onClick={() => editFunc(e)}
                    >
                      <PencilIcon className="h-4 w-4" />
                      Edit
                    </Button>

                    <Link
                      to={`/dashboard/productInfo/${e.id}`}
                      className="w-full"
                    >
                      <Button
                        size="sm"
                        variant="outlined"
                        className="w-full flex items-center justify-center gap-2"
                      >
                        <InformationCircleIcon className="h-4 w-4" />
                        Info
                      </Button>
                    </Link>

                    <Button
                      size="sm"
                      className="bg-red-600 hover:bg-red-700 flex items-center justify-center gap-2"
                      onClick={() => dispatch(deleteProduct(e.id))}
                    >
                      <TrashIcon className="h-4 w-4" />
                      Delete
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
        </div>

        {!products?.length && (
          <div className="mt-10 text-center text-blue-gray-500">
            No products found
          </div>
        )}
      </div>

      <Dialog open={!!modalEdit} handler={() => setModalEdit(null)} size="lg">
        <DialogHeader>Edit Product</DialogHeader>

        <DialogBody className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Input
            name="editProductName"
            label="Product name"
            defaultValue={modalEdit?.productName}
            form="editProductForm"
          />
          <Input
            name="editDescription"
            label="Description"
            defaultValue={modalEdit?.description}
            form="editProductForm"
            className="md:col-span-2"
          />
          <Input
            name="editQuantity"
            label="Quantity"
            defaultValue={modalEdit?.quantity}
            form="editProductForm"
          />
          <Input
            name="editPrice"
            label="Price"
            defaultValue={modalEdit?.price}
            form="editProductForm"
          />
          <div>
            <label className="mb-2 block text-sm font-medium text-blue-gray-700">
              Discount
            </label>
            <select
              name="editHasDiscount"
              defaultValue={String(modalEdit?.hasDiscount)}
              form="editProductForm"
              className="w-full rounded-lg border border-blue-gray-200 bg-white px-3 py-2 text-sm outline-none focus:border-gray-900"
            >
              <option value="true">true</option>
              <option value="false">false</option>
            </select>
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-blue-gray-700">
              Discount price
            </label>
            <Input
              name="editDiscountPrice"
              label="Discount price"
              defaultValue={modalEdit?.discountPrice}
              form="editProductForm"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-blue-gray-700">
              Subcategory
            </label>
            <select
              name="editSubCategoryId"
              defaultValue={modalEdit?.subCategoryId}
              form="editProductForm"
              className="w-full rounded-lg border border-blue-gray-200 bg-white px-3 py-2 text-sm outline-none focus:border-gray-900"
            >
              {subCategory?.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.subCategoryName}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-blue-gray-700">
              Brand
            </label>
            <select
              name="editBrandId"
              defaultValue={modalEdit?.brandId}
              form="editProductForm"
              className="w-full rounded-lg border border-blue-gray-200 bg-white px-3 py-2 text-sm outline-none focus:border-gray-900"
            >
              {brand?.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.brandName}
                </option>
              ))}
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-medium text-blue-gray-700">
              Color
            </label>
            <select
              name="editColorId"
              defaultValue={modalEdit?.colorId}
              form="editProductForm"
              className="w-full rounded-lg border border-blue-gray-200 bg-white px-3 py-2 text-sm outline-none focus:border-gray-900"
            >
              {color?.map((c) => {
                const hex = toHex(c.colorName);
                const fg = textColorForBg(hex);
                return (
                  <option
                    key={c.id}
                    value={c.id}
                    style={{ backgroundColor: hex, color: fg }}
                  >
                    {hex}
                  </option>
                );
              })}
            </select>
          </div>

          <form
            id="editProductForm"
            onSubmit={editProductSubmit}
            className="hidden"
          />
        </DialogBody>

        <DialogFooter className="gap-2">
          <Button variant="text" color="red" onClick={() => setModalEdit(null)}>
            Close
          </Button>
          <Button
            className="bg-blue-gray-900"
            onClick={() => {
              const form = document.getElementById("editProductForm");
              if (form) form.requestSubmit();
            }}
          >
            Save
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
};

export default Products;
