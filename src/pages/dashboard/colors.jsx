import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  deleteColor,
  getColor,
  postColor,
  putColor,
} from "@/api/colorAPI/colorAPI";
import {
  InformationCircleIcon,
  PencilIcon,
  TrashIcon,
  PlusIcon,
} from "@heroicons/react/24/solid";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Input,
  Typography,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";

const toHex = (v = "") => {
  if (!v) return "#000000";
  if (v.includes("%")) {
    const hex = v.replace("%", "#");
    return hex.length > 7 ? `#${hex.slice(2)}` : hex;
  }
  return v.replace("%", "#");
};

const toApi = (hex = "") => hex.replace("#", "%");

const Colors = () => {
  const dispatch = useDispatch();
  const { color } = useSelector((store) => store.colorSlice);

  const [open, setOpen] = useState(false);
  const [editColor, setEditColor] = useState(null);
  const [createHex, setCreateHex] = useState("#111827");

  useEffect(() => {
    dispatch(getColor());
  }, [dispatch]);

  const handleOpen = (payload = null) => {
    setEditColor(payload);
    setOpen((s) => !s);
  };

  const editHex = useMemo(
    () => toHex(editColor?.colorName || "#000000"),
    [editColor?.colorName],
  );

  return (
    <div className="min-h-[calc(100vh-64px)] px-4 pb-8 pt-6">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-6 lg:flex-row">
          <Card className="w-full lg:w-[360px] border border-blue-gray-100 shadow-sm">
            <CardBody className="p-5">
              <Typography className="text-xl font-bold text-blue-gray-900">
                Add New Color
              </Typography>
              <Typography variant="small" className="mt-1 text-blue-gray-500">
                Pick a color and save it.
              </Typography>

              <form
                className="mt-5 flex flex-col gap-4"
                onSubmit={(e) => {
                  e.preventDefault();
                  dispatch(postColor(toApi(createHex)));
                }}
              >
                <div className="relative overflow-hidden rounded-xl border border-blue-gray-100 bg-white">
                  <div
                    className="h-16 w-full"
                    style={{
                      background:
                        "linear-gradient(to right, rgba(0,0,0,.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,.06) 1px, transparent 1px)",
                      backgroundSize: "18px 18px",
                    }}
                  />
                  <div
                    className="absolute inset-0"
                    style={{ background: createHex }}
                  />
                  <div className="absolute left-3 top-3 rounded-full bg-white/85 px-3 py-1 text-xs font-semibold text-blue-gray-800 backdrop-blur border border-blue-gray-100 shadow-sm">
                    Preview
                  </div>
                </div>

                <Input
                  type="color"
                  value={createHex}
                  onChange={(e) => setCreateHex(e.target.value)}
                  name="colorName"
                  className="p-0 !border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />

                <div className="flex items-center justify-between">
                  <span className="rounded-lg border border-blue-gray-100 bg-blue-gray-50 px-2.5 py-1 text-xs font-mono text-blue-gray-700">
                    {createHex.toUpperCase()}
                  </span>
                  <Button
                    type="submit"
                    className="flex items-center gap-2 bg-blue-gray-900"
                  >
                    <PlusIcon className="h-4 w-4" />
                    ADD
                  </Button>
                </div>
              </form>
            </CardBody>
          </Card>

          <div className="w-full">
            <div className="flex items-end justify-between gap-3">
              <div>
                <Typography className="text-xl font-bold text-blue-gray-900">
                  Colors
                </Typography>
                <Typography variant="small" className="text-blue-gray-500">
                  Manage your palette.
                </Typography>
              </div>
              <div className="flex gap-5">
                <div>

                <Input
                  onChange={(e) => dispatch(getColor(e.target.value))}
                  label="Search"
                  />
                  </div>
                <Button variant="outlined" onClick={() => dispatch(getColor())}>
                  Refresh
                </Button>
              </div>
            </div>

            <div className="mt-5 grid w-full grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
              {color?.map(({ colorName, id }) => {
                const hex = toHex(colorName);
                return (
                  <Card
                    key={id}
                    className="w-full overflow-hidden border border-blue-gray-100 hover:shadow-md transition-all duration-200"
                  >
                    <CardHeader
                      floated={false}
                      shadow={false}
                      className="m-0 p-0"
                    >
                      <div className="relative h-56 xl:h-40">
                        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,.06)_1px,transparent_1px)] bg-[size:18px_18px]" />
                        <div
                          className="absolute inset-0"
                          style={{ background: hex }}
                        />
                        <div className="absolute left-3 top-3">
                          <span className="rounded-full bg-white/85 backdrop-blur px-3 py-1 text-xs font-semibold text-blue-gray-800 shadow-sm border border-blue-gray-100">
                            Color
                          </span>
                        </div>
                      </div>
                    </CardHeader>

                    <CardBody className="px-4 py-3">
                      <div className="flex items-center justify-between gap-3">
                        <Typography className="font-semibold text-blue-gray-900">
                          HEX
                        </Typography>
                        <span className="rounded-lg border border-blue-gray-100 bg-blue-gray-50 px-2.5 py-1 text-xs font-mono text-blue-gray-700">
                          {hex.toUpperCase()}
                        </span>
                      </div>
                      <Typography
                        variant="small"
                        className="mt-2 font-normal text-blue-gray-500"
                      >
                        View details, edit, or delete.
                      </Typography>
                    </CardBody>

                    <CardFooter className="px-4 pb-4 pt-0">
                      <div className="flex items-center flex-col gap-2">
                        <Link
                          to={`/dashboard/colorInfo/${id}`}
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
                            handleOpen({
                              id,
                              colorName,
                            })
                          }
                        >
                          <PencilIcon className="h-4 w-4" />
                          Edit
                        </Button>

                        <Button
                          size="sm"
                          className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700"
                          onClick={() => dispatch(deleteColor(id))}
                        >
                          <TrashIcon className="h-4 w-4" />
                          Delete
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                );
              })}
            </div>

            {!color?.length && (
              <Card className="mt-5 border border-blue-gray-100">
                <CardBody className="p-8 text-center">
                  <Typography className="text-lg font-semibold text-blue-gray-900">
                    No colors yet
                  </Typography>
                  <Typography
                    variant="small"
                    className="mt-2 text-blue-gray-500"
                  >
                    Add your first color from the left panel.
                  </Typography>
                </CardBody>
              </Card>
            )}
          </div>
        </div>
      </div>

      <Dialog open={open} handler={handleOpen}>
        <DialogHeader className="flex flex-col gap-1">
          <span className="text-blue-gray-900">Edit Color</span>
          <span className="text-sm font-normal text-blue-gray-500">
            {editHex.toUpperCase()}
          </span>
        </DialogHeader>

        <DialogBody className="flex flex-col gap-4">
          <div className="relative overflow-hidden rounded-xl border border-blue-gray-100 bg-white">
            <div
              className="h-20 w-full"
              style={{
                background:
                  "linear-gradient(to right, rgba(0,0,0,.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,.06) 1px, transparent 1px)",
                backgroundSize: "18px 18px",
              }}
            />
            <div className="absolute inset-0" style={{ background: editHex }} />
            <div className="absolute left-3 top-3 rounded-full bg-white/85 px-3 py-1 text-xs font-semibold text-blue-gray-800 backdrop-blur border border-blue-gray-100 shadow-sm">
              Preview
            </div>
          </div>

          <Input
            type="color"
            value={editHex}
            onChange={(e) =>
              setEditColor((p) => ({
                ...p,
                colorName: toApi(e.target.value),
              }))
            }
            className="p-0 !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{ className: "before:content-none after:content-none" }}
          />
        </DialogBody>

        <DialogFooter className="gap-2">
          <Button
            variant="text"
            color="red"
            onClick={() => {
              setOpen(false);
              setEditColor(null);
            }}
          >
            Cancel
          </Button>
          <Button
            className="bg-blue-gray-900"
            onClick={() => {
              if (!editColor?.id) return;
              dispatch(putColor(editColor));
              setOpen(false);
              setEditColor(null);
            }}
          >
            Confirm
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
};

export default Colors;
