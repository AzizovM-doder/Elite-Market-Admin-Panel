import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  deleteBrand,
  getBrand,
  postBrand,
  putBrand,
} from "@/api/brandAPI/brandAPI";
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
  PencilIcon,
  TrashIcon,
  InformationCircleIcon,
  PlusIcon,
} from "@heroicons/react/24/solid";

const Brands = () => {
  const { brand } = useSelector((store) => store.brandSlice);
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [editBrand, setEditBrand] = useState({ id: null, brandName: "" });
  const [brandName, setBrandName] = useState("");

  useEffect(() => {
    dispatch(getBrand());
  }, [dispatch]);

  const toggle = (payload) => {
    setEditBrand(payload);
    setOpen(!open);
  };

  const canSave = editBrand.id && editBrand.brandName.trim().length >= 2;

  return (
    <div className="min-h-[calc(100vh-64px)] px-4 pb-8 pt-6">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-6 lg:flex-row">
          <Card className="w-full lg:w-[360px] border border-blue-gray-100 shadow-sm">
            <CardBody className="p-5">
              <Typography className="text-xl font-bold text-blue-gray-900">
                Add New Brand
              </Typography>
              <Typography variant="small" className="mt-1 text-blue-gray-500">
                Create a brand name and save it.
              </Typography>

              <form
                className="mt-5 flex flex-col gap-4"
                onSubmit={(e) => {
                  e.preventDefault();
                  dispatch(postBrand(brandName));
                  setBrandName("");
                }}
              >
                <Input
                  value={brandName}
                  onChange={(e) => setBrandName(e.target.value)}
                  name="brandName"
                  placeholder="Brand name"
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />

                <Button
                  type="submit"
                  className="flex items-center justify-center gap-2 bg-blue-gray-900 disabled:opacity-50"
                >
                  <PlusIcon className="h-4 w-4" />
                  ADD BRAND
                </Button>
              </form>
            </CardBody>
          </Card>

          <div className="w-full">
            <div className="flex items-end justify-between gap-3">
              <div>
                <Typography className="text-xl font-bold text-blue-gray-900">
                  Brands
                </Typography>
                <Typography variant="small" className="text-blue-gray-500">
                  Edit, view, or delete brands.
                </Typography>
              </div>
              <div className="flex gap-5">
                <div>
                  <Input
                    onChange={(e) => dispatch(getBrand(e.target.value))}
                    label="Search"
                  />
                </div>
                <Button variant="outlined" onClick={() => dispatch(getBrand())}>
                  Refresh
                </Button>
              </div>
            </div>

            <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {brand?.map(({ brandName, id }) => (
                <Card
                  key={id}
                  className="border border-blue-gray-100 hover:shadow-md transition-all duration-200"
                >
                  <CardBody className="p-5">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <Typography className="font-semibold text-blue-gray-900 truncate">
                          {brandName}
                        </Typography>
                        <Typography
                          variant="small"
                          className="text-blue-gray-500"
                        >
                          ID: <span className="font-mono">{id}</span>
                        </Typography>
                      </div>

                      <span className="shrink-0 rounded-lg border border-blue-gray-100 bg-blue-gray-50 px-2.5 py-1 text-xs font-semibold text-blue-gray-700">
                        Brand
                      </span>
                    </div>
                  </CardBody>

                  <CardFooter className="p-4  pt-0">
                    <div className="flex flex-col gap-2">
                      <Link
                        className="w-full"
                        to={`/dashboard/brandInfo/${id}`}
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
                        onClick={() => toggle({ id, brandName })}
                      >
                        <PencilIcon className="h-4 w-4" />
                        Edit
                      </Button>

                      <Button
                        size="sm"
                        className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700"
                        onClick={() => dispatch(deleteBrand(id))}
                      >
                        <TrashIcon className="h-4 w-4" />
                        Delete
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>

            {!brand?.length && (
              <Card className="mt-5 border border-blue-gray-100">
                <CardBody className="p-8 text-center">
                  <Typography className="text-lg font-semibold text-blue-gray-900">
                    No brands found
                  </Typography>
                  <Typography
                    variant="small"
                    className="mt-2 text-blue-gray-500"
                  >
                    Add your first brand from the left panel.
                  </Typography>
                </CardBody>
              </Card>
            )}
          </div>
        </div>
      </div>

      <Dialog open={open} handler={toggle}>
        <DialogHeader>Edit Brand</DialogHeader>
        <DialogBody className="flex flex-col gap-3">
          <Typography variant="small" className="text-blue-gray-500">
            Update brand name
          </Typography>
          <Input
            value={editBrand.brandName}
            onChange={(e) =>
              setEditBrand({ ...editBrand, brandName: e.target.value })
            }
            placeholder="Brand name"
            className="!border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{ className: "before:content-none after:content-none" }}
          />
        </DialogBody>
        <DialogFooter className="gap-2">
          <Button
            variant="text"
            color="red"
            onClick={() => {
              setOpen(false);
            }}
          >
            Cancel
          </Button>
          <Button
            disabled={!canSave}
            className="bg-blue-gray-900 disabled:opacity-50"
            onClick={() => {
              dispatch(putBrand(editBrand));
              setOpen(false);
            }}
          >
            Save
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
};

export default Brands;
