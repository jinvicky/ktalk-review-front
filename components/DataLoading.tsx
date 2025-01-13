import { CircularProgress } from "@mui/material";


export const DataLoading = () => {
    return (
        <div className="flex justify-center items-center h-screen">
            <CircularProgress size="5rem" />
        </div>
    );
}

export default DataLoading;