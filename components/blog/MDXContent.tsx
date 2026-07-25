import * as runtime from "react/jsx-runtime";

/**
 * Renderiza o MDX compilado pelo Velite (o campo `content` é um function-body).
 * Padrão oficial do Velite — não precisa de runtime MDX externo.
 * Roda no servidor (SSG): a avaliação acontece no build, não no cliente.
 */
type MDXComponent = React.ComponentType<{ components?: Record<string, React.ComponentType> }>;

function getMDXComponent(code: string): MDXComponent {
  const fn = new Function(code);
  return fn({ ...runtime }).default as MDXComponent;
}

export function MDXContent({
  code,
  components,
}: {
  code: string;
  components?: Record<string, React.ComponentType>;
}) {
  // Server Component (SSG): o componente é montado a partir do MDX compilado no
  // build, sem reconciliação no cliente — a regra static-components não se aplica.
  const Component = getMDXComponent(code);
  // eslint-disable-next-line react-hooks/static-components
  return <Component components={components} />;
}
