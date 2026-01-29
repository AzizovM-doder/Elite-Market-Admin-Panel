import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getColorById } from "@/api/colorAPI/colorAPI";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Button,
  Typography,
} from "@material-tailwind/react";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";

const toHex = (v = "") => {
  if (!v) return "#000000";
  if (v.includes("%")) {
    const hex = v.replace("%", "#");
    return hex.length > 7 ? `#${hex.slice(2)}` : hex;
  }
  return v.replace("%", "#");
};

const ColorInfo = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { colorId } = useSelector((store) => store.colorSlice);

  useEffect(() => {
    if (id) dispatch(getColorById(id));
  }, [dispatch, id]);

  const hex = useMemo(() => toHex(colorId?.colorName), [colorId?.colorName]);

  return (
    <div className="min-h-300 py-6">
        <Button
          variant="text"
          className="mb-4 flex items-center gap-2"
          onClick={() => navigate(-1)}
        >
          <ArrowLeftIcon className="h-4 w-4" />
          Back
        </Button>
      <div className="mx-auto max-w-xl">

        <Card className="overflow-hidden border border-blue-gray-100 shadow-sm">
          <CardHeader floated={false} shadow={false} className="m-0 p-0">
            <div className="relative h-56">
              <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,.06)_1px,transparent_1px)] bg-[size:18px_18px]" />
              <div className="absolute inset-0" style={{ background: hex }} />
              <div className="absolute left-4 top-4 rounded-full bg-white/85 backdrop-blur px-3 py-1 text-xs font-semibold text-blue-gray-800 border border-blue-gray-100 shadow-sm">
                Preview
              </div>
            </div>
          </CardHeader>

          <CardBody className="p-6">
            <div className="flex items-center justify-between">
              <Typography className="text-lg font-semibold text-blue-gray-900">
                Color Details
              </Typography>
              <span className="rounded-lg border border-blue-gray-100 bg-blue-gray-50 px-2.5 py-1 text-xs font-mono text-blue-gray-700">
                {hex.toUpperCase()}
              </span>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-4">
              <div className="rounded-xl border border-blue-gray-100 p-4">
                <Typography variant="small" className="text-blue-gray-500">
                  ID
                </Typography>
                <Typography className="font-semibold text-blue-gray-900">
                  {colorId?.id}
                </Typography>
              </div>

              <div className="rounded-xl border border-blue-gray-100 p-4">
                <Typography variant="small" className="text-blue-gray-500">
                  HEX
                </Typography>
                <Typography className="font-mono font-semibold text-blue-gray-900">
                  {hex.toUpperCase()}
                </Typography>
              </div>
            </div>
          </CardBody>

          <CardFooter className="flex justify-end px-6 pb-6 pt-0">
            <Button
              className="bg-blue-gray-900"
              onClick={() => navigate(-1)}
            >
              Go Back
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default ColorInfo;
