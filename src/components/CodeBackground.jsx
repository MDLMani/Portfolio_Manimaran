import { useMemo } from 'react'
import { CODE_SNIPPETS } from '../data/portfolio'

const LANG_LABEL = {
  dart: 'Dart · Flutter',
  typescript: 'TypeScript · Node.js',
  javascript: 'JavaScript · Integrations',
  sql: 'SQL · PostgreSQL',
  python: 'Python · AI',
  bash: 'Bash · DevOps',
  react: 'React · Vite',
}

function colorize(line) {
  const escaped = line
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')

  return escaped
    .replace(
      /(\/\/.*|#(?!\{).*|--.*)$/g,
      '<span class="tok-comment">$1</span>',
    )
    .replace(
      /(&quot;|')(?:\\.|(?!\1).)*\1/g,
      (m) => `<span class="tok-string">${m}</span>`,
    )
    .replace(
      /\b(import|export|from|const|let|var|function|async|await|return|class|extends|new|if|else|for|while|try|catch|throw|typeof|interface|type|public|private|final|override|Future|Widget|StatefulWidget|StatelessWidget|CREATE|TABLE|PRIMARY|KEY|REFERENCES|DEFAULT|NOT|NULL|CHECK|IN|SELECT|WHERE|JOIN)\b/g,
      '<span class="tok-kw">$1</span>',
    )
    .replace(/\b(\d+)\b/g, '<span class="tok-num">$1</span>')
}

export default function CodeBackground({ language = 'typescript', density = 'normal' }) {
  const code = CODE_SNIPPETS[language] || CODE_SNIPPETS.typescript
  const lines = useMemo(() => {
    const base = code.split('\n')
    const repeats = density === 'dense' ? 5 : 4
    return Array.from({ length: repeats }, () => base).flat()
  }, [code, density])

  return (
    <div className={`code-bg code-bg--${language}`} aria-hidden="true">
      <div className="code-bg__veil" />
      <div className="code-bg__grid" />
      <div className="code-bg__label">{LANG_LABEL[language] || language}</div>
      <pre className="code-bg__pre">
        {lines.map((line, i) => (
          <span
            key={`${language}-${i}-${line.slice(0, 18)}`}
            className="code-bg__line"
            style={{ '--i': i }}
          >
            <em>{String((i % 99) + 1).padStart(2, '0')}</em>
            <span dangerouslySetInnerHTML={{ __html: colorize(line || ' ') }} />
          </span>
        ))}
      </pre>
    </div>
  )
}
