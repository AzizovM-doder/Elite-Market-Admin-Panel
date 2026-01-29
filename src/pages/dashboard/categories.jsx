import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCategory,
  getCategory,
  postCategory,
  putCategory,
} from "@/api/categoryAPI/categoryAPI";
import { API_IMG } from "@/utils/url";
import { Link } from "react-router-dom";
import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Chip,
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

const Categories = () => {
  const { category } = useSelector((store) => store.categorySlice);
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [edit, setEdit] = useState({
    id: null,
    categoryName: "",
    categoryImage: "",
    file: null,
    preview: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("CategoryName", e.target.categoryName.value);
    formData.append("CategoryImage", e.target.image?.files[0]);
    dispatch(postCategory(formData));
    e.target.reset();
  };

  const openEdit = ({ id, categoryName, categoryImage }) => {
    setEdit({
      id,
      categoryName,
      categoryImage,
      file: null,
      preview: categoryImage ? `${API_IMG}/${categoryImage}` : "",
    });
    setOpen(true);
  };

  const closeEdit = () => {
    setOpen(false);
    setEdit({
      id: null,
      categoryName: "",
      categoryImage: "",
      file: null,
      preview: "",
    });
  };

  const onPickEditImage = (file) => {
    const reader = new FileReader();
    reader.onload = () => {
      setEdit((p) => ({
        ...p,
        file,
        preview: reader.result,
      }));
    };
    reader.readAsDataURL(file);
  };

  const saveEdit = () => {
    const formData = new FormData();
    formData.append("Id", edit.id);
    formData.append("CategoryName", edit.categoryName);

    if (edit.file) {
      formData.append("CategoryImage", edit.file);
    }

    dispatch(putCategory(formData));
    closeEdit();
  };

  useEffect(() => {
    dispatch(getCategory());
  }, [dispatch]);
  return (
    <div className="min-h-[calc(100vh-64px)] px-4 py-6">
      <div className="mx-auto max-w-7xl">
        <Card className="mb-8 border border-blue-gray-100">
          <CardBody className="p-6">
            <Typography className="mb-4 text-xl font-bold text-blue-gray-900">
              Add New Category
            </Typography>

            <div className="flex flex-col gap-4">
              <form
                onSubmit={handleSubmit}
                className="flex flex-col w-full gap-4 sm:flex-row lg:justify-between"
              >
                <div className="w-full">
                  <Input label="Category name" name="categoryName" required />
                </div>
                <div className="w-full">
                  <Input type="file" name="image" accept="image/*" required />
                </div>
                <div className="w-full">
                  <Button
                    type="submit"
                    className="flex w-full justify-center items-center gap-2 bg-blue-gray-900"
                  >
                    <PlusIcon className="h-4 w-4" />
                    Add
                  </Button>
                </div>
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
                  onClick={() => dispatch(getCategory())}
                  type="button"
                >
                  Refresh
                </Button>
              </div>
            </div>
          </CardBody>
        </Card>

        <Typography className="mb-6 text-2xl font-bold text-blue-gray-900">
          Categories
        </Typography>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {category
            ?.filter((e) =>
              e?.categoryName
                .toLowerCase()
                .includes(search.toLowerCase().trim()),
            )
            .map(({ categoryName, subCategories, categoryImage, id }) => (
              <Card
                key={id}
                className="border border-blue-gray-100 hover:shadow-md transition-all"
              >
                <CardBody className="p-6 flex flex-col items-center text-center">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-blue-gray-100 bg-blue-gray-50 overflow-hidden">
                    <img
                      src={`${API_IMG}/${categoryImage}`}
                      alt={categoryName}
                      className="h-10 w-10 object-contain"
                    />
                  </div>

                  <Typography className="mb-3 text-lg font-semibold text-blue-gray-900">
                    {categoryName}
                  </Typography>

                  <div className="flex flex-wrap justify-center gap-2">
                    {subCategories?.length ? (
                      subCategories.map((sub) => (
                        <Chip
                          key={sub.id}
                          value={sub.subCategoryName}
                          variant="ghost"
                          className="text-xs font-medium"
                        />
                      ))
                    ) : (
                      <Typography
                        variant="small"
                        className="text-blue-gray-500"
                      >
                        No subcategories
                      </Typography>
                    )}
                  </div>
                </CardBody>

                <CardFooter className="px-4 pb-4 pt-0">
                  <div className="flex items-center justify-between gap-2">
                    <Link
                      to={`/dashboard/categoryInfo/${id}`}
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
                        openEdit({ id, categoryName, categoryImage })
                      }
                    >
                      <PencilIcon className="h-4 w-4" />
                      Edit
                    </Button>

                    <Button
                      size="sm"
                      className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700"
                      onClick={() => dispatch(deleteCategory(id))}
                    >
                      <TrashIcon className="h-4 w-4" />
                      Delete
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
        </div>

        {!category?.length && (
          <div className="mt-10 text-center text-blue-gray-500">
            No categories found
          </div>
        )}
      </div>

      <Dialog open={open} handler={closeEdit} size="sm">
        <DialogHeader>Edit Category</DialogHeader>

        <DialogBody className="flex flex-col gap-4">
          <div className="flex items-center justify-center">
            <div className="h-24 w-24 rounded-full border border-blue-gray-100 bg-blue-gray-50 overflow-hidden flex items-center justify-center">
              {edit.preview ? (
                <img
                  src={edit.preview}
                  alt="preview"
                  className="h-full w-full object-cover"
                />
              ) : (
                <span className="text-blue-gray-400 text-sm">No image</span>
              )}
            </div>
          </div>

          <Input
            label="Category name"
            value={edit.categoryName}
            onChange={(e) => setEdit({ ...edit, categoryName: e.target.value })}
          />

          <Input
            type="file"
            accept="image/*"
            onChange={(e) => onPickEditImage(e.target.files[0])}
          />
        </DialogBody>

        <DialogFooter className="gap-2">
          <Button variant="text" color="red" onClick={closeEdit}>
            Cancel
          </Button>
          <Button className="bg-blue-gray-900" onClick={saveEdit}>
            Save
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
};

export default Categories;
