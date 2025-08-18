import {
  FormComponents,
  LayoutComponents,
  DataDisplayComponents,
  AdvancedFormComponents,
  NavigationComponents,
  FeedbackComponents,
  AuthComponents,
} from "./PageDemo/components";

export function PageDemo() {
  return (
    <div className="max-w-7xl mx-auto p-8 space-y-12">
      <h1 className="text-4xl font-bold mb-8 text-center">
        Profesjonalne Demo Komponentów UI
      </h1>

      <FormComponents />
      <LayoutComponents />
      <DataDisplayComponents />
      <AdvancedFormComponents />
      <NavigationComponents />
      <FeedbackComponents />
      <AuthComponents />
    </div>
  );
}
