import FormBoard from "../Forms/FormBoard";

interface Props {
  backdropRef: HTMLElement | any;
  activeMenu: boolean;
  resetDivHandler: any;
}

const AddBoard = ({ backdropRef, activeMenu, resetDivHandler }: Props) => {
  return (
    <div
      ref={backdropRef}
      className={`${
        activeMenu && "sm:translate-x-[-100px] md:translate-x-[0]"
      } pointer-events-auto absolute z-40 h-fit w-[340px] rounded-md bg-white  p-8 text-start opacity-100 dark:bg-[#2B2C37] sm:w-[480px]`}
    >
      {/* For new Board */}
      <div className="flex h-full w-full flex-col">
        <h3 className="mb-6 text-lg font-bold">Add New Board</h3>
        <FormBoard resetDiv={resetDivHandler} />
      </div>
    </div>
  );
};

export default AddBoard;
