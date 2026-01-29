import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  Card,
  CardBody,
  CardFooter,
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
  PlusIcon,
} from "@heroicons/react/24/solid";
import {
  getSubCategory,
  postSubCategory,
  putSubCategory,
  deleteSubCategory,
} from "@/api/subCategoryAPI/subCategoryAPI";
import { getCategory } from "@/api/categoryAPI/categoryAPI";

const SubCategories = () => {
  const { subCategory } = useSelector((store) => store.subCategorySlice);
  const { category } = useSelector((store) => store.categorySlice);
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState({
    id: null,
    subCategoryName: "",
    categoryId: "",
  });

  const [name, setName] = useState("");
  const [search, setSearch] = useState("");
  const [categoryId, setCategoryId] = useState("");

  useEffect(() => {
    dispatch(getSubCategory());
    dispatch(getCategory());
  }, [dispatch]);

  useEffect(() => {
    if (!categoryId && category?.length) {
      setCategoryId(String(category[0].id));
    }
  }, [category, categoryId]);

  const toggle = (payload) => {
    if (payload) {
      setEdit({
        id: payload.id,
        subCategoryName: payload.subCategoryName,
        categoryId: String(payload.categoryId || categoryId || ""),
      });
    }
    setOpen(!open);
  };

  const addSub = (e) => {
    e.preventDefault();
    dispatch(
      postSubCategory({
        name: name.trim(),
        id: categoryId,
      }),
    );

    setName("");
  };

  const save = () => {
    if (!edit.id || !edit.subCategoryName.trim() || !edit.categoryId) return;

    dispatch(
      putSubCategory({
        id: edit.id,
        name: edit.subCategoryName.trim(),
        categoryId: edit.categoryId,
      }),
    );

    setOpen(false);
    setEdit({ id: null, subCategoryName: "", categoryId: "" });
  };

  return (
    <div className="min-h-[calc(100vh-64px)] px-4 py-6">
      <div className="mx-auto max-w-7xl">
        <Card className="mb-8 border border-blue-gray-100">
          <CardBody className="p-6">
            <Typography className="mb-4 text-xl font-bold text-blue-gray-900">
              Add New Subcategory
            </Typography>

            <div className="flex flex-col gap-4">
              <div className="w-full">
                <label className="mb-2 block text-sm font-medium text-blue-gray-700">
                  Category
                </label>
                <select
                  name="category"
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                  className="w-full rounded-lg border border-blue-gray-200 bg-white px-3 py-2 text-sm outline-none focus:border-gray-900"
                >
                  {category?.map(({ id, categoryName }) => (
                    <option key={id} value={id}>
                      {categoryName}
                    </option>
                  ))}
                </select>
              </div>

              <form
                onSubmit={addSub}
                className="flex flex-col w-full gap-4 sm:flex-row sm:items-end"
              >
                <div className="w-full">
                  <Input
                    label="Subcategory name"
                    value={name}
                    className="w-full"
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 bg-blue-gray-900"
                >
                  <PlusIcon className="h-4 w-4" />
                  Add
                </Button>
              </form>
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
                  onClick={() => dispatch(getSubCategory())}
                  type="button"
                >
                  Refresh
                </Button>
              </div>
            </div>
          </CardBody>
        </Card>

        <Typography className="mb-6 text-2xl font-bold text-blue-gray-900">
          Subcategories
        </Typography>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {subCategory
            ?.filter((e) =>
              e?.subCategoryName.toLowerCase().includes(search.toLowerCase().trim()),
            )
            .map(({ subCategoryName, id, categoryId }) => (
              <Card
                key={id}
                className="border border-blue-gray-100 hover:shadow-md transition-all"
              >
                <CardBody className="p-6">
                  <Typography className="text-lg font-semibold text-blue-gray-900">
                    {subCategoryName}
                  </Typography>
                  <Typography
                    variant="small"
                    className="text-blue-gray-500 mt-1"
                  >
                    ID: <span className="font-mono">{id}</span>
                  </Typography>
                </CardBody>

                <CardFooter className="px-4 pb-4 pt-0">
                  <div className="flex items-center justify-between gap-2">
                    <Link
                      to={`/dashboard/subCategoryInfo/${id}`}
                      className="w-full"
                    >
                      <Button
                        variant="outlined"
                        size="sm"
                        className="w-full flex items-center justify-center gap-2"
                      >
                        <InformationCircleIcon className="h-4 w-4" />
                        Info
                      </Button>
                    </Link>

                    <Button
                      size="sm"
                      className="w-full flex items-center justify-center gap-2 bg-blue-gray-900"
                      onClick={() =>
                        toggle({ id, subCategoryName, categoryId })
                      }
                    >
                      <PencilIcon className="h-4 w-4" />
                      Edit
                    </Button>

                    <Button
                      size="sm"
                      className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700"
                      onClick={() => dispatch(deleteSubCategory(id))}
                    >
                      <TrashIcon className="h-4 w-4" />
                      Delete
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
        </div>

        {!subCategory?.length && (
          <div className="mt-10 text-center text-blue-gray-500">
            No subcategories found
          </div>
        )}
      </div>

      <Dialog open={open} handler={toggle}>
        <DialogHeader>Edit Subcategory</DialogHeader>
        <DialogBody className="flex flex-col gap-4">
          <div className="w-full">
            <label className="mb-2 block text-sm font-medium text-blue-gray-700">
              Category
            </label>
            <select
              value={edit.categoryId}
              onChange={(e) => setEdit({ ...edit, categoryId: e.target.value })}
              className="w-full rounded-lg border border-blue-gray-200 bg-white px-3 py-2 text-sm outline-none focus:border-gray-900"
            >
              {category?.map(({ id, categoryName }) => (
                <option key={id} value={id}>
                  {categoryName}
                </option>
              ))}
            </select>
          </div>

          <Input
            label="Subcategory name"
            value={edit.subCategoryName}
            onChange={(e) =>
              setEdit({ ...edit, subCategoryName: e.target.value })
            }
          />
        </DialogBody>
        <DialogFooter className="gap-2">
          <Button
            variant="text"
            color="red"
            onClick={() => {
              setOpen(false);
              setEdit({ id: null, subCategoryName: "", categoryId: "" });
            }}
          >
            Cancel
          </Button>
          <Button className="bg-blue-gray-900" onClick={save}>
            Save
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
};

export default SubCategories;
