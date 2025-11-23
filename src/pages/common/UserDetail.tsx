import { getTypeUserById } from "@/service/apis";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom"

export function TypeUserDetail() {
    const {id=""} = useParams();
    const userDetailQuery = useQuery({
        queryKey: ["userDetail", id],
        queryFn: () => getTypeUserById(id),
        enabled: id?.length > 0
    })
    console.log(id, userDetailQuery.isLoading)
    return(
        <div>user detail</div>
    )
}