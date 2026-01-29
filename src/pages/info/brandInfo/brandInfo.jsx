import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getBrandById } from "@/api/brandAPI/brandAPI";
import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { ArrowLeftIcon, TagIcon } from "@heroicons/react/24/solid";

const BrandInfo = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { brandById } = useSelector((store) => store.brandSlice);

  useEffect(() => {
    if (id) dispatch(getBrandById(id));
  }, [dispatch, id]);

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
      <div className="mx-auto max-w-lg">

        <Card className="border border-blue-gray-100 shadow-sm">
          <CardBody className="p-6">
            <div className="flex items-start justify-between gap-3">
              <div>
                <Typography className="text-lg font-bold text-blue-gray-900">
                  Brand Details
                </Typography>
                <Typography variant="small" className="text-blue-gray-500">
                  Information about this brand
                </Typography>
              </div>

              <span className="rounded-lg border border-blue-gray-100 bg-blue-gray-50 px-3 py-1 text-xs font-semibold text-blue-gray-700 flex items-center gap-1">
                <TagIcon className="h-3.5 w-3.5" />
                Brand
              </span>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="rounded-xl border border-blue-gray-100 p-4">
                <Typography variant="small" className="text-blue-gray-500">
                  ID
                </Typography>
                <Typography className="font-semibold text-blue-gray-900">
                  {brandById?.id}
                </Typography>
              </div>

              <div className="rounded-xl border border-blue-gray-100 p-4">
                <Typography variant="small" className="text-blue-gray-500">
                  Brand Name
                </Typography>
                <Typography className="font-semibold text-blue-gray-900">
                  {brandById?.brandName}
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

export default BrandInfo;
