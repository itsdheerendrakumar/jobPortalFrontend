import { getTypeUserById } from "@/service/apis";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { CustomError } from "@/types/error";
import { FullPageLoding } from "@/components/customComponents/common/Loader";
import { ShowError } from "@/components/customComponents/common/ShowError";
import { Button } from "@/components/ui/button";
export function TypeUserDetail() {
    const {id=""} = useParams();
    const userDetailQuery = useQuery<TypeUserDetailResponse, CustomError>({
        queryKey: ["userDetail", id],
        queryFn: () => getTypeUserById(id),
    })
    if(userDetailQuery.isLoading) return <FullPageLoding />
    if(userDetailQuery.isError) return <ShowError message={userDetailQuery.error?.message} />
    const user = userDetailQuery.data?.data
    return(
    <div className="min-h-screen bg-gray-50 flex items-start justify-center p-6">
      <div className="w-full max-w-4xl space-y-6">
        {/* Profile Card */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl md:text-2xl">
              {user?.name}
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-1">{user?.status ?? ""}</p>
          </CardHeader>

          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Email</span>
                <span className="text-sm">{user?.email}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Phone</span>
                <span className="text-sm">{user?.phone ?? "—"}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Country</span>
                <span className="text-sm">{user?.country ?? "—"}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Joined</span>
                <span className="text-sm">
                  {user?.createdAt ? new Date(user?.createdAt).toLocaleString() : "—"}
                </span>
              </div>

              {user?.resumeUrl && (
                <div className="mt-3">
                  <a
                    href={user?.resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block"
                  >
                    <Button className="w-full md:w-auto">Open / Download Resume</Button>
                  </a>
                </div>
              )}
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Education</h3>

              {user?.education && user?.education.length > 0 ? (
                <ul className="space-y-3">
                  {user?.education?.map((edu, idx: number) => (
                    <li
                      key={idx}
                      className="p-3 rounded-md border border-gray-100 bg-white shadow-sm"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium">{edu.name}</p>
                          <p className="text-sm text-gray-500">{edu.collegeName}</p>
                        </div>

                        <div className="text-right">
                          <p className="text-sm font-medium">{edu.percentage}%</p>
                          <p className="text-xs text-gray-400">{edu.passYear}</p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-gray-400">No education data available.</p>
              )}
            </div>
          </CardContent>
        </Card>

          <Card className="shadow">
            <CardHeader>
              <CardTitle className="text-lg">Resume Preview</CardTitle>
            </CardHeader>
            {!user?.resumeUrl &&
                <CardContent>
                    <p className="text-sm text-gray-500">No resume uploaded.</p>
                </CardContent>
            }
            {user?.resumeUrl &&
                <CardContent>
                  <div className="w-full h-[80vh] border rounded-md overflow-hidden">
                    <iframe
                      title={`${user?.name} - resume`}
                      src={`https://docs.google.com/gview?url=${encodeURIComponent(
                        user?.resumeUrl
                      )}&embedded=true`}
                      className="w-full h-full"
                    />
                  </div>
                </CardContent>
            }
          </Card>
      </div>
    </div>
    )
}
