var W=Object.defineProperty;var _=(e,o)=>{for(var t in o)W(e,t,{get:o[t],enumerable:!0})};import"dotenv/config";import oe from"chalk";import B from"express";import te from"cors";import{Router as Y}from"express";var s=class e extends Error{statusCode;status;operational;constructor(o,t){super(o),this.statusCode=t,this.status=t.toString().startsWith("2")?"success":"fail",this.operational=!0,Object.setPrototypeOf(this,e.prototype),Error.captureStackTrace(this,this.constructor)}};var D=process.env.ENVIROMENT==="PROD",U=async(e,o,t,a)=>{if(e instanceof s){t.status(e.statusCode).send({status:e.status,statusCode:e.statusCode,message:e.message,...D?{}:{stack:e.stack}});return}t.status(500).send({status:"fail",statusCode:500,message:"Oops, Something went very wrong!",...D?{}:{stack:e.stack}})},g=U;var l={OK:200,CREATED:201,BAD_REQUEST:400,UNAUTHORIZED:401,FORBIDDEN:403,NOT_FOUND:404,INTERNAL_SERVER_ERROR:500};function f(e){return e.split("-").map(o=>o[0].toUpperCase()+o.slice(1)).join("")}var b=`[
	{
		"name": "Button",
		"componentDependencies": [
			"loading-spinner"
		],
		"dependencies": [],
		"devDependencies": [
			"class-variance-authority"
		]
	},
	{
		"name": "DashboardLayout",
		"componentDependencies": [
			"table"
		],
		"dependencies": [],
		"devDependencies": []
	},
	{
		"name": "Dialog",
		"componentDependencies": [],
		"dependencies": [],
		"devDependencies": []
	},
	{
		"name": "Dropdown",
		"componentDependencies": [
			"popover"
		],
		"dependencies": [
			"react-loading-skeleton"
		],
		"devDependencies": []
	},
	{
		"name": "Input",
		"componentDependencies": [],
		"dependencies": [
			"react-loading-skeleton"
		],
		"devDependencies": []
	},
	{
		"name": "LoadingSpinner",
		"componentDependencies": [],
		"dependencies": [],
		"devDependencies": []
	},
	{
		"name": "Popover",
		"componentDependencies": [],
		"dependencies": [],
		"devDependencies": []
	},
	{
		"name": "Table",
		"componentDependencies": [],
		"dependencies": [],
		"devDependencies": []
	},
	{
		"name": "Toast",
		"componentDependencies": [],
		"dependencies": [],
		"devDependencies": []
	}
]`;var C={};_(C,{Button:()=>R,DashboardLayout:()=>S,Dialog:()=>N,Dropdown:()=>P,Input:()=>k,LoadingSpinner:()=>M,Popover:()=>O,Table:()=>E,Toast:()=>L});var j=String.raw`
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/lib";
import { forwardRef, Ref } from "react";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";

const buttonVariants = cva(
  "flex items-center justify-center whitespace-nowrap rounded-sm text-sm transition-colors disabled:pointer-events-none px-6 py-3 cursor-pointer transition disabled:bg-slate-500 leading-[100%] items-center",
  {
    variants: {
      variant: {
        primary: "bg-black text-white hover:bg-slate-900",
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  }
);

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    isLoading?: boolean;
    to?: string;
  };

function Button(
  { className, variant, isLoading, children, ...props }: ButtonProps,
  ref: Ref<HTMLButtonElement>
) {
  return (
    <button
      className={cn(buttonVariants({ variant }), className)}
      ref={ref}
      disabled={props.disabled || isLoading}
      onClick={(e) => {
        if (props.onClick) props.onClick(e);
      }}
      {...props}
    >
      {children}
      {isLoading && <LoadingSpinner className="stroke-white ml-2" />}
    </button>
  );
}

Button.displayName = "Button";

export default forwardRef(Button);
`,R=j;var z=String.raw`
import Table from "@/components/ui/Table";

const invoices = [
  {
    invoice: "INV001",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV002",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV003",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV004",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card",
  },
];

export default function DashboardLayout() {
  return (
    <div className="min-h-screen w-full bg-slate-200">
      <div className="min-h-screen grid grid-cols-[12.5rem_1fr]">
        <aside className="bg-white">
          <p>Sidebar</p>
        </aside>
        <main className="relative">
          <header className="py-4 bg-white px-4">Top Bar</header>
          <section className="overflow-auto absolute inset-0 px-4 mt-14 flex flex-col">
            <h1 className="mb-4 font-semibold text-2xl mt-4">Dashboard</h1>
            <div className="mb-6 grid grid-cols-3 gap-4 w-full min-w-[50rem]">
              <div className="px-4 py-4 rounded-md bg-white text-xl">120</div>
              <div className="px-4 py-4 rounded-md bg-white text-xl">120</div>
              <div className="px-4 py-4 rounded-md bg-white text-xl">120</div>
            </div>
            <div className="bg-white rounded-md flex-1 min-w-[50rem]">
              <Table.Container>
                <Table.Head sticky>
                  <Table.Row>
                    <Table.Cell>Invoice</Table.Cell>
                    <Table.Cell>Payment Status</Table.Cell>
                    <Table.Cell>Total Amount</Table.Cell>
                    <Table.Cell>Payment Method</Table.Cell>
                  </Table.Row>
                </Table.Head>
                <Table.Body>
                  {invoices.map((data, i) => {
                    return (
                      <Table.Row key={i}>
                        <Table.Cell>{data.invoice}</Table.Cell>
                        <Table.Cell>{data.paymentStatus}</Table.Cell>
                        <Table.Cell>{data.totalAmount}</Table.Cell>
                        <Table.Cell>{data.paymentMethod}</Table.Cell>
                      </Table.Row>
                    );
                  })}
                </Table.Body>
              </Table.Container>{" "}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
`,S=z;var $=String.raw`
import {
  MouseEvent,
  ReactElement,
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
} from "react";
import { cn } from "@/utils/lib";

const ANIMATION_DURATION_MS = 200;

type DialogComponentOptions = {
  collapseWhenClickOutside?: boolean;
};
type DialogComponent = {
  name: string;
  component: ReactElement;
  options?: DialogComponentOptions;
};

type TDialogContextValues = {
  open: (dialogName: string, context?: unknown) => void;
  close: (options?: { persistBackground?: boolean }) => Promise<void>;
  context: unknown;
  isShowing: boolean;
};
const DialogContext = createContext<TDialogContextValues | null>(null);

export type DialogComponents = DialogComponent[];
/*
 * DialogProvider is a context provider that provides a function to display a dialog component.
 * The dialog component is displayed at the center of the screen and can be closed by clicking outside the dialog component.
 */
export function DialogProvider({
  children,
  components,
}: {
  children: ReactNode;
  components: DialogComponent[];
}) {
  // Context data that we can pass into a dialog component.
  // When the user selects a sepcific task, the details from that task if first passed into this context then to the dialog component itself.
  const [contextData, setContextData] = useState<unknown>({});
  const wrapperRef = useRef<null | HTMLDivElement>(null);

  // The options that can be passed into a dialog component.
  const [options, setOptions] = useState<DialogComponentOptions | undefined>();

  // The dialog component that is currently being displayed. Dialog selection is uesd by passing a key (string) that we have defined in the \`components\` array.
  const [isShowing, setIsShowing] = useState<{
    name: string;
    selectedComponent?: ReactElement;
  }>({
    name: "",
  });

  // Displays a dialog component by passing in the key (string) that we have defined in the \`components\` array.
  const open = useCallback(
    (dialogName: string, context?: unknown) => {
      // 1. Find the dialog component that matches the key (string) that we have defined in the \`components\` array.
      const selectedComponent = components.find(
        (component) => component.name === dialogName
      );

      // 2. Throw an error if the user made an error by passing a dialog component string that does not exist.
      if (!selectedComponent)
        throw new Error(
          \`Dialog with the name of \${dialogName} does not exist!\`
        );

      // 3. If provided, set the context data and options that we have defined in the \`components\` array.
      if (context) setContextData(context);
      if (selectedComponent.options) setOptions(selectedComponent.options);

      // 5. Set the dialog component that will be displayed.
      setIsShowing((current) => {
        return {
          ...current,
          name: dialogName,
          selectedComponent: selectedComponent.component,
        };
      });
    },
    [components]
  );

  const close = () => {
    return new Promise<void>((resolve) => {
      // 1. Restore the initial state of the dialog component.
      setIsShowing({
        name: "",
      });
      setContextData({});
      setOptions(undefined);

      // 2. Resolve the promise after the animation duration has passed. This is primarily used to be able to asynchronously perform animations while waiting the for close animation to finish.
      setTimeout(() => {
        resolve();
      }, ANIMATION_DURATION_MS);
    });
  };

  // Close the dialog when the user clicks outside.
  const handleClickOutside = (e: MouseEvent) => {
    console.log("CLICKED");
    e.stopPropagation();

    // Disable the click outside functionality (if requested). This means that the user now needs to use the <DialogCollapse/> component to close the dialog.
    if (
      options &&
      // This makes it so that only if the user explicity state true or false will this guard clause work. Basically making this option true by default
      typeof options.collapseWhenClickOutside === "boolean" &&
      !options.collapseWhenClickOutside
    )
      return;

    // Retrieve the dialog component. Since the dialog component is always the child of \`wrapper\` then we can use .children[0]. However, do know that because of this, we cannot use <Fragments/> when creating a dialog component.
    const wrapper = wrapperRef.current?.children[0];

    if (!wrapper) return;

    // Checks if the user click outside the bounding rectagnle
    const clickedOutside = !wrapper.contains(e.target as HTMLElement);

    // If the user clicks outside, then close the dialog
    if (clickedOutside) close();
  };

  return (
    <DialogContext.Provider
      value={{
        open,
        close,
        context: contextData,
        isShowing: Boolean(isShowing.selectedComponent),
      }}
    >
      <div
        className={cn(
          "fixed inset-0 z-[9999] opacity-0 invisible bg-black/50 transition-all duration-400 flex items-center justify-center",
          isShowing.selectedComponent && "opacity-100 visible"
        )}
      >
        <div
          className={cn(
            \`dialog-content invisible scale-90 transition-all opacity-0 z-20 grid place-items-center min-h-full absolute inset-0\`,
            isShowing.selectedComponent && "opacity-100 visible scale-100"
          )}
          onMouseDown={handleClickOutside}
          ref={wrapperRef}
        >
          {isShowing.selectedComponent}
        </div>
      </div>

      {children}
    </DialogContext.Provider>
  );
}

type AssertDialogNames<
  DialogContext,
  Components extends readonly DialogComponent[]
> = {
  [ContextKey in keyof DialogContext]: ContextKey extends "open"
    ? (dialogName: Components[number]["name"], context?: unknown) => void
    : DialogContext[ContextKey];
};

export function useDialogContext<ContextTypes = unknown>() {
  const context = useContext(DialogContext);
  if (!context)
    throw new Error(
      "useDialog should be called inside the <DialogProvider/> component"
    );
  return context.context as ContextTypes;
}

export function useDialog<Components extends readonly DialogComponent[]>() {
  const context = useContext(DialogContext);
  if (!context)
    throw new Error(
      "useDialog should be called inside the <DialogProvider/> component"
    );
  return context as AssertDialogNames<TDialogContextValues, Components>;
}
`,N=$;var q=String.raw`
import {
  ComponentProps,
  forwardRef,
  HTMLAttributes,
  Ref,
  useCallback,
  useState,
} from "react";
import { cn } from "@/utils/lib";
import Popover from "@/components/ui/Popover";
import Skeleton from "react-loading-skeleton";

type Props = {
  /**
   * Placeholder trigger content when no options is selected
   */
  placeholder: string;

  /**
   * List of options that will be displayed on the dropdown content, accepts string only
   */
  options: readonly string[];

  /**
   * Display error message and shows an indicator, useful for forms
   */
  errorMessage?: string;

  /**
   * Sends data about the open/close state of the component
   */
  onOpenChange?: (value: boolean) => void;

  /**
   * Allows parent component to control the open/close state of the component
   */
  open?: boolean;

  /**
   * Closes the dropdown when user selects an options
   * WARNING : this prop will not work when \`open\` is used to control the component
   */
  closeOnSelect?: boolean;

  /**
   * Replaces the component with a loading skeleton
   */
  isLoading?: boolean;
};

type ChangeCallback =
  | {
      /**
       * Allows user to select multiple inputs
       */
      multiple: true;
      /**
       * Callback that sends a string[] when \`multiple\` is true and a string[] when it is false
       */
      onChange?: (values: string[]) => void;

      /**
       * Allows user to control the component from outside, value will depend of the \`multiple\` prop, string[] when true or string otherwise.
       */
      value?: string[];
    }
  | {
      multiple?: false | undefined;
      onChange?: (values: string) => void;
      value?: string;
    };

type DropdownProps = Props &
  ChangeCallback &
  Omit<ComponentProps<typeof Popover.Container>, "onChange"> &
  Omit<HTMLAttributes<HTMLDivElement>, "onChange">;

function Dropdown(
  {
    placeholder,
    options,
    multiple = false,
    onChange = () => {},
    errorMessage,
    closeOnSelect = false,
    isLoading,
    value,
    ...props
  }: DropdownProps,
  ref: Ref<HTMLDivElement>
) {
  /**
   * Keeps track of the selected items
   */
  const [selected, setSelected] = useState<string[]>([]);

  /**
   * Keeps track of the component's open state
   */
  const [isOpen, setIsOpen] = useState(false);

  /**
   * Retrieves the corresponding value when the component becomes controlled (\`value\` props is inserted)
   */
  const getSelected = useCallback(() => {
    if (typeof value === "undefined") return selected;
    if (multiple) return value as string[];
    return [value] as string[];
  }, [selected, value, multiple]);

  /**
   * Stores the logic for inserting / removing an item to the selected list
   */
  const handleSelect = useCallback(
    (item: string) => () => {
      let newValue = getSelected();

      // Remove the item from the list of they already exist
      if (getSelected().includes(item)) {
        newValue = getSelected().filter((current) => item !== current);
      } else {
        // Appends an item on multiple mode, change the item on single mode.
        newValue = multiple ? [item, ...getSelected()] : [item];
      }

      // The return value should be an array when the \`multiple\` prop is set to true
      setSelected(newValue);
      if (!onChange) return;
      if (multiple) {
        // [HELP NEEDED] : Are there better ways?
        onChange(newValue as string[] & string);
      } else {
        // [HELP NEEDED] : Are there better ways?
        onChange(newValue[0] as string[] & string);
      }

      // Closes the component when user selects a value (toggleable via props)
      if (closeOnSelect) setIsOpen(false);
    },
    [closeOnSelect, multiple, onChange, getSelected]
  );

  /**
   * Retrieves and formats the selected value in a presentable string format, used to display the contents of the dropdown trigger.
   */
  const getSelectedValue = useCallback(() => {
    return getSelected().length > 1
      ? getSelected().join(", ")
      : getSelected()[0];
  }, [getSelected]);

  return (
    <Popover.Container
      {...props}
      ref={ref}
      open={isOpen}
      onOpenChange={(value) => {
        if (!isLoading) setIsOpen(value);
      }}
      triggerContentGap={6}
    >
      {!isLoading ? (
        <Popover.Trigger
          className={cn(
            "border truncate border-slate-300 rounded-sm px-3 py-2 cursor-pointer flex justify-between hover:bg-slate-50 transition",
            errorMessage && "border-red-400"
          )}
        >
          <p className={cn(errorMessage && "text-red-400")}>
            {getSelectedValue() || placeholder}
          </p>
          <svg
            className={cn("transition", isOpen && "rotate-180")}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path d="M16.293 9.293 12 13.586 7.707 9.293l-1.414 1.414L12 16.414l5.707-5.707z"></path>
          </svg>
        </Popover.Trigger>
      ) : (
        <Skeleton height={"2.5rem"} containerClassName="block leading-0" />
      )}
      {errorMessage && (
        <div className="flex items-center gap-2 mt-1">
          <svg
            className="text-red-400 fill-red-400"
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
          >
            <path d="M11.953 2C6.465 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.493 2 11.953 2zM12 20c-4.411 0-8-3.589-8-8s3.567-8 7.953-8C16.391 4 20 7.589 20 12s-3.589 8-8 8z"></path>
            <path d="M11 7h2v7h-2zm0 8h2v2h-2z"></path>
          </svg>
          <p className="text-red-400">{errorMessage}</p>
        </div>
      )}
      <Popover.Content className="p-1 border border-slate-300 shadow-xl shadow-slate-100 rounded-sm grid gap-1 bg-white">
        {options.map((item, i) => {
          const isSelected = getSelected().includes(item);
          return (
            <div
              key={i}
              className={cn(
                "rounded-sm py-2 px-2 transition hover:bg-slate-50 cursor-pointer text-slate-500",
                isSelected && "bg-slate-100 text-bg-slate-500"
              )}
              onClick={handleSelect(item)}
            >
              {item}
            </div>
          );
        })}
      </Popover.Content>
    </Popover.Container>
  );
}

export default forwardRef(Dropdown);
`,P=q;var G=String.raw`
import { InputHTMLAttributes, Ref, forwardRef } from "react";
import Skeleton from "react-loading-skeleton";
import { cn } from "@/utils/lib";

type Props = {
  /**
   * Displays a label indicator above the component
   */
  label?: string;

  /**
   * Content when value is undefined
   */
  placeholder: string;

  /**
   * \`className\` for the child input element
   */
  inputClassName?: string;

  /**
   * Displays a loading skeleton in place of the component
   */
  isLoading?: boolean;

  /**
   * Display an nicely formatted error message
   */
  errorMessage?: string;
};

function Input(
  {
    label,
    isLoading,
    placeholder,
    errorMessage,
    inputClassName,
    onBlur,
    ...props
  }: Props & InputHTMLAttributes<HTMLInputElement>,
  ref: Ref<HTMLInputElement>
) {
  return (
    <div className={props.className}>
      <div className="flex justify-between">
        {label && <label className="pb-2 text-slate-900">{label}</label>}
      </div>
      {!isLoading ? (
        <input
          {...props}
          ref={ref}
          onBlur={onBlur}
          className={cn(
            "border border-slate-300 rounded-sm w-full px-3 py-2 disabled:text-slate-500 outline-none focus:border-accent transition placeholder:text-slate-400 disabled:cursor-not-allowed",
            errorMessage && "border-red-400 ",
            inputClassName
          )}
          placeholder={placeholder}
        />
      ) : (
        <Skeleton
          containerClassName="block leading-0"
          height={"2.5rem"}
          className="mt-0 block"
        />
      )}
      {errorMessage && (
        <div className="flex items-center gap-2 mt-1">
          <svg
            className="text-red-400 fill-red-400"
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
          >
            <path d="M11.953 2C6.465 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.493 2 11.953 2zM12 20c-4.411 0-8-3.589-8-8s3.567-8 7.953-8C16.391 4 20 7.589 20 12s-3.589 8-8 8z"></path>
            <path d="M11 7h2v7h-2zm0 8h2v2h-2z"></path>
          </svg>
          <p className="text-red-400">{errorMessage}</p>
        </div>
      )}
    </div>
  );
}

export default forwardRef(Input);
`,k=G;var K=String.raw`
import { cn } from "@/utils/lib";

type Props = { className?: string };

export function LoadingSpinner({ className }: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("animate-spin", className)}
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  );
}
`,M=K;var F=String.raw`
import {
  createContext,
  forwardRef,
  HTMLAttributes,
  MutableRefObject,
  PropsWithChildren,
  Ref,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { cn } from "@/utils/lib";

type Props = {
  /**
   * Sends data about the open/close state of the component
   */
  onOpenChange?: (value: boolean) => void;

  /**
   * Allows parent component to control the open/close state of the component
   */
  open?: boolean;

  /**
   * Sets the gap between the trigger and content component
   */
  triggerContentGap?: number;
};

type PopoverContextValues = {
  isOpen: boolean;
  handleChangeOpen: () => void;
  triggerHeightPx: number;
  setTriggerHeightPx: React.Dispatch<React.SetStateAction<number>>;
  triggerContentGap: number;
};

const PopoverContext = createContext<PopoverContextValues | null>(null);

/**
 * 
 * @example 
* <Popover.Container>
    <Popover.Trigger>Select Item</Popover.Trigger>
    <Popover.Content>
      <p>Content 1</p>
      <p>Content 2</p>
      <p>Content 3</p>
      <p>Content 4</p>
      <p>Content 5</p>
    </Popover.Content>
</Popover.Container>
 */
function Container(
  {
    onOpenChange,
    open,
    triggerContentGap = 0,
    children,
    ...props
  }: PropsWithChildren<Props> & HTMLAttributes<HTMLDivElement>,
  ref: Ref<HTMLDivElement>
) {
  /**
   * Stores the trigger element height, used to automatically calculate the  distance between content and trigger.
   */
  const [triggerHeightPx, setTriggerHeightPx] = useState(0);

  /**
   * Stores the container / top-level element
   */
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  /**
   * Keeps track of the open state of the element
   */
  const [isOpen, setIsOpen] = useState(false);

  /**
   * Handling dropdown opening / closing
   */
  const handleChangeOpen = useCallback(() => {
    setIsOpen((current) => !current);

    // Sends the is open state to the callback
    if (onOpenChange) onOpenChange(!isOpen);
  }, [isOpen, onOpenChange]);

  /**
   * Handles closing when the user clicks outside the dropdown element.
   */
  useEffect(() => {
    if (!dropdownRef.current) return;
    // Closes the dropdown element when the user clicks outiside the component
    const handleClickOutside = (e: MouseEvent) => {
      if (isOpen && !dropdownRef.current?.contains(e.target as HTMLElement)) {
        setIsOpen((current) => !current);
        if (onOpenChange) onOpenChange(!isOpen);
      }
    };

    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen, onOpenChange]);

  return (
    <PopoverContext.Provider
      // Uses the \`open\` prop when it is passed in. This will cause the component to ignore the \`isOpen\` state
      value={{
        isOpen: typeof open === "undefined" ? isOpen : open,
        handleChangeOpen,
        triggerHeightPx,
        setTriggerHeightPx,
        triggerContentGap,
      }}
    >
      <div
        ref={(elRef) => {
          // Passing internal dropdown ref used to click outside
          dropdownRef.current = elRef;

          // Passing forward ref
          if (ref && "current" in ref && elRef) {
            (ref as MutableRefObject<HTMLDivElement>).current = elRef;
          }
        }}
        {...props}
        className={cn("relative", props.className)}
      >
        {children}
      </div>
    </PopoverContext.Provider>
  );
}

function Trigger(
  props: PropsWithChildren<HTMLAttributes<HTMLButtonElement>>,
  ref: Ref<HTMLButtonElement>
) {
  const context = useContext(PopoverContext);
  if (!context) return;

  return (
    <button
      {...props}
      ref={(elRef) => {
        // Get the trigger's height and send the to the provider component
        context.setTriggerHeightPx(elRef?.getBoundingClientRect().height || 0);

        // Passing forward ref
        if (ref && "current" in ref && elRef) {
          (ref as MutableRefObject<HTMLButtonElement>).current = elRef;
        }
      }}
      className={cn("cursor-pointer w-full text-start", props.className)}
      onClick={(e) => {
        // Preserve onClick events sent by parent component
        if (props.onClick) props.onClick(e);

        context.handleChangeOpen();
      }}
    >
      {props.children}
    </button>
  );
}

function Content(
  props: PropsWithChildren<HTMLAttributes<HTMLDivElement>>,
  ref: Ref<HTMLDivElement>
) {
  const context = useContext(PopoverContext);
  if (!context) return;

  return (
    <div
      {...props}
      ref={ref}
      className={cn(
        "opacity-0 invisible scale-95 transition-[visibility,opacity,scale] duration-200 cursor-pointer z-20 absolute left-0 right-0",
        context.isOpen && "opacity-100 scale-100 visible ",
        props.className
      )}
      style={{
        top: \`\${context.triggerHeightPx + context.triggerContentGap}px\`,
      }}
    >
      {props.children}
    </div>
  );
}

export default {
  Container: forwardRef(Container),
  Trigger: forwardRef(Trigger),
  Content: forwardRef(Content),
};
`,O=F;var J=String.raw`
import { forwardRef, HTMLAttributes, PropsWithChildren, Ref } from "react";
import { cn } from "@/utils/lib";

/**
 * @example
 * <Table.Container className="min-w-[50rem] rounded-md overflow-hidden">
    <Table.Head sticky>
      <Table.Row className="bg-white">
        <Table.Cell>Invoice</Table.Cell>
        <Table.Cell>Payment Status</Table.Cell>
        <Table.Cell>Total Amount</Table.Cell>
        <Table.Cell>Payment Method</Table.Cell>
      </Table.Row>
    </Table.Head>
    <Table.Body>
      {invoices.map((data, i) => {
        return (
          <Table.Row className="bg-white" key={i}>
            <Table.Cell>{data.invoice}</Table.Cell>
            <Table.Cell>{data.paymentStatus}</Table.Cell>
            <Table.Cell>{data.totalAmount}</Table.Cell>
            <Table.Cell>{data.paymentMethod}</Table.Cell>
          </Table.Row>
        );
      })}
    </Table.Body>
  </Table.Container>
 * @returns 
 */
function Container(
  { children, ...props }: PropsWithChildren & HTMLAttributes<HTMLTableElement>,
  ref: Ref<HTMLTableElement>
) {
  return (
    <table {...props} ref={ref} className={cn("w-full", props.className)}>
      {children}
    </table>
  );
}

function Head(
  {
    children,
    ...props
  }: PropsWithChildren<{ sticky?: boolean }> &
    HTMLAttributes<HTMLTableSectionElement>,
  ref: Ref<HTMLTableSectionElement>
) {
  return (
    <thead
      {...props}
      ref={ref}
      className={cn(
        props.sticky && "sticky top-0 right-0 left-0",
        props.className
      )}
    >
      {children}
    </thead>
  );
}

function Body(
  {
    children,
    ...props
  }: PropsWithChildren & HTMLAttributes<HTMLTableSectionElement>,
  ref: Ref<HTMLTableSectionElement>
) {
  return (
    <tbody {...props} ref={ref}>
      {children}
    </tbody>
  );
}

function Row(
  {
    children,
    ...props
  }: PropsWithChildren<{ padding?: { x?: number; y?: number } }> &
    HTMLAttributes<HTMLTableRowElement>,
  ref: Ref<HTMLTableRowElement>
) {
  return (
    <tr {...props} ref={ref}>
      {children}
    </tr>
  );
}

function Cell(
  {
    children,
    ...props
  }: PropsWithChildren & HTMLAttributes<HTMLTableCellElement>,
  ref: Ref<HTMLTableCellElement>
) {
  return (
    <td className="px-4 py-2 text-start" ref={ref} {...props}>
      {children}
    </td>
  );
}

export default {
  Container: forwardRef(Container),
  Body: forwardRef(Body),
  Head: forwardRef(Head),
  Row: forwardRef(Row),
  Cell: forwardRef(Cell),
};
`,E=J;var Q=String.raw`
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { cn } from "@/utils/lib";
import { createPortal } from "react-dom";

type ToastContextValues = {
  success: (message: string) => void;
  error: (message: string) => void;
};

const ToastContext = createContext<ToastContextValues | null>(null);

type ToastState = {
  message: string;
  // Used to differentiate calls from \`toast()\`. Without this, a call from \`toast()\` with the same message won't trigger the timeout effect.
  id: number;
  show: boolean;
  type: "success" | "error";
};

/*
 * ToastProvider is a context provider that provides a function to display a Toast message.
 * The Toast message is displayed at the bottom of the screen and disappears after a specified amount of time.
 * The message can be displayed using the \`toast.success(msg)\` or \`toast.error(msg)\` function.
 *
 * Self implementation of the popular library \`react-toastify\` to display Toast messages.
 */
export default function ToastProvider({
  children,
  suspendDuration = 2000,
}: {
  children: ReactNode;
  suspendDuration?: number;
}) {
  const [state, setState] = useState<ToastState>({
    id: 0,
    message: "Default message",
    show: false,
    type: "success",
  });

  // Suspends / display the Toast for a specified amount of time.
  useEffect(() => {
    const suspend = setTimeout(() => {
      setState((cur) => ({ ...cur, show: false }));
    }, suspendDuration);

    return () => {
      clearTimeout(suspend);
    };
  }, [suspendDuration, state.message, state.id]);

  /**
   * Displays the Toast window with the message inside.
   */
  const toast = useMemo(() => {
    return {
      success: (message: string) =>
        setState({ id: Math.random(), message, show: true, type: "success" }),
      error: (message: string) =>
        setState({ id: Math.random(), message, show: true, type: "error" }),
    };
  }, []);

  return (
    <ToastContext.Provider value={toast}>
      {createPortal(
        <div
          className={cn(
            "fixed bottom-4 right-6 z-[100] translate-y-[-2rem] text-slate-900 bg-bg text-start flex justify-between items-center pl-5 pr-4 py-2 rounded-md shadow-lg shadow-main/30 transition-all duration-500 w-fit border-slate-300 border whitespace-nowrap gap-4 bg-white",
            state.type === "error" && "bg-red-500 border-red-400 text-white"
          )}
          style={{
            translate: state.show ? "0 0" : "0 300%",
          }}
        >
          {state.message}
        </div>,
        document.body
      )}

      {children}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context)
    throw new Error("useToast can't be used outside of its provider's scope");
  return context;
}
`,L=Q;var Z=async(e,o,t)=>{try{let a=e.query.components;if(!a)throw new s("No components was provided",l.BAD_REQUEST);let d=a.split(",").map(n=>f(n)),m=JSON.parse(b),x={};m.forEach(n=>{x[n.name]=n});let T=new Set,y=new Set,u=[],h=d;for(;h.length>0;){let n=h.shift();if(!n)continue;let p=x[n];if(!p)throw new s(`Component ${n} not found`,l.NOT_FOUND);u.includes(n)||(p.componentDependencies.forEach(i=>{h.push(f(i))}),p.dependencies.forEach(i=>T.add(i)),p.devDependencies.forEach(i=>y.add(i)),u.push(n))}o.send({components:u.map(n=>({name:n,content:C[n].replace(/\\`/g,"`").replace(/\\\$\{/g,"${").replace(/^\n+/,"")})),dependencies:Array.from(T),devDependencies:Array.from(y)})}catch(a){t(a)}},X=async(e,o,t)=>{try{let d=JSON.parse(b).map(m=>m.name);o.send({data:d})}catch(a){t(a)}},c={getComponent:Z,getComponentNames:X};var w=Y();w.get("/",c.getComponent);w.get("/names",c.getComponentNames);var H=w;import{Router as ee}from"express";var A=ee();A.use("/",H);var I=A;var r=B();r.use(te());r.use(B.json());r.use(I);r.use("*",(e,o,t)=>{t(new s("Route not found",l.NOT_FOUND))});r.use(g);var V=r;var v=process.env.PORT||"";V.listen(v,()=>{console.log(`${oe.blue("[SERVER]")} Running on Port ${v}`)});
//# sourceMappingURL=index.js.map