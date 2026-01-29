import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getSubCategoryById } from "../../../api/subCategoryAPI/subCategoryAPI";
import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Chip,
} from "@material-tailwind/react";
import {
  ArrowLeftIcon,
  TagIcon,
  Squares2X2Icon,
} from "@heroicons/react/24/solid";

const SubCategoryInfo = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { subCategoryId } = useSelector((store) => store.subCategorySlice);

  useEffect(() => {
    if (id) dispatch(getSubCategoryById(id));
  }, [dispatch, id]);

  return (
    <div className="min-h-[70vh] py-10 px-4 bg-gradient-to-b from-blue-gray-50 to-white">
      <div className="mx-auto max-w-4xl">
        <div className="flex items-center justify-between gap-3 mb-6">
          <Button
            variant="text"
            className="flex items-center gap-2 rounded-xl"
            onClick={() => navigate(-1)}
          >
            <ArrowLeftIcon className="h-4 w-4" />
            Back
          </Button>
        </div>

        <Card className="overflow-hidden border border-blue-gray-100 shadow-xl rounded-3xl">
          <div className="p-6 bg-white">
            <div className="flex items-start justify-between gap-4">
              <div>
                <Typography className="text-2xl font-extrabold text-blue-gray-900">
                  {subCategoryId?.subCategoryName || "SubCategory Info"}
                </Typography>
                <Typography variant="small" className="text-blue-gray-500">
                  Quick informtion for ths subcategory
                </Typography>
              </div>

              <Chip
                value="Subcategory"
                className="bg-blue-gray-900 text-white rounded-full"
              />
            </div>
          </div>

          <CardBody className="p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-3xl border border-blue-gray-100 bg-white p-5 shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                  <TagIcon className="h-5 w-5 text-blue-gray-700" />
                  <Typography className="font-semibold text-blue-gray-900">
                    Subcategory ID
                  </Typography>
                </div>

                <Typography className="text-blue-gray-700 font-mono text-sm break-all">
                  {subCategoryId?.id || "—"}
                </Typography>
              </div>

              <div className="rounded-3xl border border-blue-gray-100 bg-white p-5 shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                  <Squares2X2Icon className="h-5 w-5 text-blue-gray-700" />
                  <Typography className="font-semibold text-blue-gray-900">
                    Name
                  </Typography>
                </div>

                <Typography className="text-xl font-extrabold text-blue-gray-900">
                  {subCategoryId?.subCategoryName || "—"}
                </Typography>
              </div>
            </div>
          </CardBody>

          <CardFooter className="px-6 pb-6 pt-0 flex items-center justify-end gap-3 bg-white">
            <Button
              className="bg-blue-gray-900 rounded-xl"
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

export default SubCategoryInfo;
