export interface ActionResult<T = void> {
  success: boolean;
  message?: string;
  redirectTo?: string;
  errors?: Record<string, string>;
  data?: T;
}
