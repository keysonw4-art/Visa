import * as runtime from "react/jsx-runtime";

/**
 * Renderiza o MDX compilado pelo Velite (o campo `content` é um function-body).
 * Padrão oficial do Velite — não precisa de runtime MDX externo.
 */
function useMDXComponent(code: string) {
  const fn = new Function(code);
  return fn({ ...runtime }).default as React.ComponentType<{ components?: Record<string, React.ComponentType> }>;
}

export function MDXContent({
  code,
  components,
}: {
  code: string;
  components?: Record<string, React.ComponentType>;
}) {
  const Component = useMDXComponent(code);
  return <Component components={components} />;
}
