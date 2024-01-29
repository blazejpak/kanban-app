import FormBoard from "../Forms/FormBoard";

interface Props {
  backdropRef: HTMLElement | any;
  activeMenu: boolean;
}

const AddBoard = ({ backdropRef, activeMenu }: Props) => {
  return (
    <div
      ref={backdropRef}
      className={`${
        activeMenu && "sm:translate-x-[-75%]"
      } pointer-events-auto absolute  left-[50%] top-[50%] z-40 max-h-[80%]  w-[340px] translate-x-[-50%] translate-y-[-50%] overflow-y-auto rounded-md bg-white p-8 text-start opacity-100 dark:bg-[#2B2C37] sm:w-[480px]`}
    >
      {/* For new Board */}
      <div className="flex w-full flex-col">
        <h3 className="mb-6 text-lg font-bold">Add New Board</h3>
        <FormBoard />
      </div>
    </div>
  );
};

export default AddBoard;
