import {
  Card,
  CardBody,
  Avatar,
  Typography,
  Button,
} from "@material-tailwind/react";
import { PencilIcon, ArrowLeftIcon, ArrowRightOnRectangleIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { API_IMG } from "@/utils/url";
import { useEffect } from "react";
import { getUserById } from "@/api/accountAPI/accountAPI";

export function Profile() {
  const token = localStorage.getItem("adminToken");
  const account = useSelector((store) => store.accountSlice.account);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const data = token ? jwtDecode(token) : null;

  useEffect(() => {
    if (data?.sid) dispatch(getUserById(data.sid));
  }, [dispatch, data?.sid]);

  return (
    <div className="px-4 py-6">
      <div className="mx-auto max-w-6xl">
        <div className="relative overflow-hidden rounded-2xl border border-blue-gray-100 bg-white shadow-sm">
          <div className="relative h-44 w-full overflow-hidden bg-[url('/img/background-image.png')] bg-cover bg-center">
            <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 via-gray-900/60 to-gray-900/80" />
          </div>

          <div className="relative pt-20 px-6 pb-6">
            <div className="-mt-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div className="flex items-end gap-4">
                <Avatar
                  src={account?.image ? `${API_IMG}/${account.image}` : ""}
                  alt={account?.userName || "user"}
                  size="xl"
                  variant="rounded"
                  className="rounded-2xl border border-white shadow-lg shadow-blue-gray-500/30 bg-white"
                />
                <div className="pb-1">
                  <Typography className="text-xl font-bold text-blue-gray-900">
                    {account?.userName || "User"}
                  </Typography>
                  <Typography variant="small" className="text-blue-gray-500">
                    Role: {account?.userRoles?.[0]?.name || "-"}
                  </Typography>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-2">
                <Button
                  onClick={() => {
                    toast.promise("Logged Out!");
                    saveToken("");
                  }}
                  variant="text"
                  color="blue-gray"
                  className="hidden font-bold text-white hover:text-black bg-red-500 items-center gap-1 px-4 xl:flex normal-case"
                >
                  <ArrowRightOnRectangleIcon className="h-5 w-5" />
                  Log Out
                </Button>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
              <Card className="border border-blue-gray-100 shadow-none">
                <CardBody className="p-5">
                  <Typography className="text-sm font-semibold text-blue-gray-900">
                    Profile Information
                  </Typography>
                  <Typography
                    variant="small"
                    className="mt-1 text-blue-gray-500"
                  >
                    Personal details
                  </Typography>

                  <div className="mt-4 space-y-3">
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-sm text-blue-gray-500">
                        First Name
                      </span>
                      <span className="text-sm font-semibold text-blue-gray-900">
                        {account?.firstName || "-"}
                      </span>
                    </div>

                    <div className="flex items-center justify-between gap-3">
                      <span className="text-sm text-blue-gray-500">
                        Last Name
                      </span>
                      <span className="text-sm font-semibold text-blue-gray-900">
                        {account?.lastName || "-"}
                      </span>
                    </div>

                    <div className="flex items-center justify-between gap-3">
                      <span className="text-sm text-blue-gray-500">
                        Birth Date
                      </span>
                      <span className="text-sm font-semibold text-blue-gray-900">
                        {account?.dob || "-"}
                      </span>
                    </div>
                  </div>
                </CardBody>
              </Card>

              <Card className="border border-blue-gray-100 shadow-none">
                <CardBody className="p-5">
                  <Typography className="text-sm font-semibold text-blue-gray-900">
                    Contact
                  </Typography>
                  <Typography
                    variant="small"
                    className="mt-1 text-blue-gray-500"
                  >
                    How to reach you
                  </Typography>

                  <div className="mt-4 space-y-3">
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-sm text-blue-gray-500">Email</span>
                      <span className="text-sm font-semibold text-blue-gray-900 break-all text-right">
                        {account?.email || "-"}
                      </span>
                    </div>

                    <div className="flex items-center justify-between gap-3">
                      <span className="text-sm text-blue-gray-500">Phone</span>
                      <span className="text-sm font-semibold text-blue-gray-900">
                        {account?.phoneNumber || "-"}
                      </span>
                    </div>

                    <div className="flex items-center justify-between gap-3">
                      <span className="text-sm text-blue-gray-500">
                        User ID
                      </span>
                      <span className="text-sm font-mono text-blue-gray-900">
                        {account?.id || "-"}
                      </span>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
