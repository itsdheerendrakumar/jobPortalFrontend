export const FormValidationError = ({message}: {message: string | undefined}) => {
    return(
        <p className="text-destructive text-sm">*{message}</p>
    )
}