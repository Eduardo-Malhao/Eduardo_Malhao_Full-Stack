export interface IToast {
  message: string | string[],
  type: "success" | "error" | "warning" | "info"
}