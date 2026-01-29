import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
  Chip,
} from "@material-tailwind/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUserProfile, getUsers } from "@/api/accountAPI/accountAPI";
import { API_IMG } from "@/utils/url";
import { TrashIcon } from "@heroicons/react/24/solid";

export function Tables() {
  const dispatch = useDispatch();
  const { users } = useSelector((store) => store.accountSlice);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card className="border border-blue-gray-100">
        <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
          <Typography variant="h6" color="white">
            Users Table
          </Typography>
        </CardHeader>

        <CardBody className="overflow-x-auto px-0 pt-0 pb-2">
          <table className="w-full min-w-[900px] table-auto">
            <thead>
              <tr>
                {["User", "Role", "Birth date", ""].map((el) => (
                  <th
                    key={el}
                    className="border-b border-blue-gray-50 py-3 px-5 text-left"
                  >
                    <Typography
                      variant="small"
                      className="text-[11px] font-bold uppercase text-blue-gray-400"
                    >
                      {el}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {users?.map((u, idx) => {
                const last = idx === users.length - 1;
                const className = `py-3 px-5 ${
                  last ? "" : "border-b border-blue-gray-50"
                }`;

                const role = u?.userRoles?.[0]?.name || "—";
                const roleId = u?.userRoles?.[0]?.id || "—";
                return (
                  <tr key={u?.id}>
                    <td className={className}>
                      <div className="flex items-center gap-4">
                        <Avatar
                          src={
                            u.image
                              ? `${API_IMG}/${u.image}`
                              : "data:image/png;base64,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"
                          }
                          alt={u.userName}
                          size="sm"
                          variant="rounded"
                          className="border border-blue-gray-100"
                        />
                        <div className="min-w-0">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-semibold"
                          >
                            {u.userName}
                          </Typography>
                          <Typography className="text-xs font-normal text-blue-gray-500 truncate">
                            {u.email}
                          </Typography>
                        </div>
                      </div>
                    </td>

                    <td className={className}>
                      <Typography className="text-xs font-semibold text-blue-gray-600">
                        {role}
                      </Typography>
                    </td>
                    <td className={className}>
                      <Typography className="text-xs font-semibold text-blue-gray-600">
                        {u.dob || "—"}
                      </Typography>
                    </td>
                    <td className={className}>
                      <button onClick={() => dispatch(deleteUserProfile(u?.userId))}>
                        <TrashIcon width={20} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {!users?.length && (
            <div className="py-10 text-center text-blue-gray-500">
              No users found
            </div>
          )}
        </CardBody>
      </Card>
    </div>
  );
}

export default Tables;
