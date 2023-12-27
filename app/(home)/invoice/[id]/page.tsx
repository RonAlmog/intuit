"use client";

import {
  Form,
  FormControl,
  FormField,
  FormLabel,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import axios from "axios";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

const formSchema = z.object({
  clientName: z.string().min(1, { message: "Client name is required!" }),

  amount: z.coerce
    .number({
      required_error: "Amount is required",
      invalid_type_error: "Amount must be a number",
    })
    .min(-10000, { message: "Must be larger than -10,000" })
    .max(1000000, { message: "Must be lower than 1,000,000" }),
  reference: z.string().min(1, { message: "Reference is required!" }),
  createdAt: z.date(),
});

const InvoicePage = ({ params }: { params: { id: string } }) => {
  const [date, setDate] = useState<Date>();
  const [mode, setMode] = useState("new"); // new or edit

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      clientName: "",
      amount: 0,
      reference: "",
      createdAt: new Date(),
    },
  });

  useEffect(() => {
    const getData = async () => {
      await axios
        .get(`/api/invoices/${params.id}`)
        .then((response) => {
          const fields = ["clientName", "amount", "reference"];
          fields.forEach((field) =>
            form.setValue(field as any, response.data[field])
          );
          form.setValue("createdAt", new Date(response.data["createdAt"]));
        })
        .catch((error) => {
          router.push("/");
        });
    };
    if (params.id !== "new") {
      setMode("edit");
      getData();
    }
  }, [form, params.id, router]);

  const { isSubmitting, isValid } = form.formState;
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (mode === "new") {
      await axios
        .post("/api/invoices/", values)
        .then((result) => {
          toast.success("Saved!");
          router.push("/");
        })
        .catch((error) => {
          toast.error("Oops, that did not work");
        });
    } else {
      // edit mode, use patch
      await axios
        .patch(`/api/invoices/${params.id}`, values)
        .then((result) => {
          toast.success("Invoice Updated!");
          router.push("/");
        })
        .catch((error) => {
          toast.error("Oops, that did not work");
        });
    }
  };
  return (
    <div className="w-full sm:w-[400px] mx-auto p-2">
      <div className="w-full flex items-center justify-center">
        <h1 className="p-2 text-2xl font-semibold">
          {mode === "new" ? "Create Invoice" : "Edit Invoice"}
        </h1>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          <FormField
            control={form.control}
            name="clientName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Client Name</FormLabel>
                <FormControl>
                  <Input {...field} disabled={isSubmitting} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Amount</FormLabel>
                <FormControl>
                  <Input {...field} disabled={isSubmitting} type="number" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="reference"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Reference</FormLabel>
                <FormControl>
                  <Input {...field} disabled={isSubmitting} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="createdAt"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Created at</FormLabel>
                <FormControl>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[280px] justify-start text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                      />
                    </PopoverContent>
                  </Popover>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex items-center justify-between gap-2 py-4">
            <Button
              onClick={() => router.push("/")}
              type="button"
              className="w-full"
              variant="outline"
            >
              Cancel
            </Button>

            <Button type="submit" className="w-full" variant="default">
              {mode === "new" ? "Create" : "Update"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default InvoicePage;
