import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getCategoryById } from "@/api/categoryAPI/categoryAPI";
import { API_IMG } from "@/utils/url";
import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Chip,
} from "@material-tailwind/react";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";

const CategoryInfo = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { categoryID } = useSelector((store) => store.categorySlice);

  useEffect(() => {
    if (id) dispatch(getCategoryById(id));
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
      <div className="mx-auto max-w-2xl">
        <Card className="border border-blue-gray-100 shadow-sm overflow-hidden">
          <div className="p-6 pb-0">
            <Typography className="text-xl font-bold text-blue-gray-900">
              Category Info
            </Typography>
            <Typography variant="small" className="text-blue-gray-500">
              Details and subcategories
            </Typography>
          </div>

          <CardBody className="p-6">
            <div className="flex flex-col sm:flex-row gap-5 items-start">
              <div className="flex items-center justify-center">
                <div className="h-28 w-28 rounded-2xl border border-blue-gray-100 bg-blue-gray-50 overflow-hidden flex items-center justify-center">
                  {categoryID?.categoryImage ? (
                    <img
                      src={`${API_IMG}/${categoryID.categoryImage}`}
                      alt={categoryID?.categoryName}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <span className="text-blue-gray-400 text-sm">No image</span>
                  )}
                </div>
              </div>

              <div className="w-full">
                <Typography className="text-lg font-semibold text-blue-gray-900">
                  {categoryID?.categoryName}
                </Typography>

                <div className="mt-3 grid grid-cols-2 gap-3">
                  <div className="rounded-xl border border-blue-gray-100 p-4">
                    <Typography variant="small" className="text-blue-gray-500">
                      ID
                    </Typography>
                    <Typography className="font-semibold text-blue-gray-900">
                      {categoryID?.id}
                    </Typography>
                  </div>

                  <div className="rounded-xl border border-blue-gray-100 p-4">
                    <Typography variant="small" className="text-blue-gray-500">
                      Subcategories
                    </Typography>
                    <Typography className="font-semibold text-blue-gray-900">
                      {categoryID?.subCategories?.length || 0}
                    </Typography>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <Typography className="font-semibold text-blue-gray-900 mb-3">
                Subcategories
              </Typography>

              <div className="flex flex-wrap gap-2">
                {categoryID?.subCategories?.length ? (
                  categoryID.subCategories.map((e) => (
                    <Chip
                      key={e.id}
                      value={e.subCategoryName}
                      variant="ghost"
                      className="text-xs font-medium"
                    />
                  ))
                ) : (
                  <Typography variant="small" className="text-blue-gray-500">
                    No subcategories
                  </Typography>
                )}
              </div>
            </div>
          </CardBody>

          <CardFooter className="px-6 pb-6 pt-0 flex justify-end">
            <Button className="bg-blue-gray-900" onClick={() => navigate(-1)}>
              Go Back
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default CategoryInfo;
