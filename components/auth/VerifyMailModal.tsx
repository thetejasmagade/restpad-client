import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import * as Types from "@/components/types";

export default function VerifyMailModal(props: Types.VerifyMailModal) {
  return (
    <>
      <AlertDialog open={props.isModalOpen}>
        <AlertDialogContent className="bg-[#dbdfff]">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-blue-700">
              Verify Your Email
            </AlertDialogTitle>
            <AlertDialogDescription className="text-black">
              A verification email has been sent to the <span className="font-bold text-blue-800">{props.email}</span> you provided
              during registration. Please follow the instructions in the email
              to complete the verification process.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            {/* <AlertDialogCancel>Cancel</AlertDialogCancel> */}
            {/* <AlertDialogAction>Continue</AlertDialogAction> */}
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
