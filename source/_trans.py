import re
import sys
from pathlib import Path


def convert_math(s):
    # \bm{...} -> \boldsymbol{...}
    s=re.sub(r'\\bm\s*\{([^{}]*)\}',r'\\boldsymbol{\1}',s)

    # 清理复制 Markdown 时混入数学命令的 **
    # 例如 **\text**{...} -> \text{...}
    s=re.sub(r'\*\*(\\(?:text|operatorname|mathrm|mathbf|mathit|mathsf|mathtt|mathbb|boldsymbol))\*\*',r'\1',s)

    # 例如 **\sum_**{...} -> \sum_{...}
    cmds=[
        'sum','prod','int','oint','lim','max','min',
        'sin','cos','tan','cot','sec','csc',
        'log','ln','exp','det','gcd',
        'alpha','beta','gamma','delta','theta','lambda',
        'mu','pi','sigma','phi','psi','omega'
    ]
    pat=r'\*\*\\('+ '|'.join(cmds) + r')\*\*'
    s=re.sub(pat,r'\\\1',s)

    # \textbf{...} 在数学环境中更推荐 \mathbf{...}
    s=re.sub(r'\\textbf\s*\{([^{}]*)\}',r'\\mathbf{\1}',s)

    # LaTeX 中常见的 \displaystyle 等保持不变
    # \limits、\nolimits 等 MathJax 可以正常处理

    return s


def protect_code_blocks(text):
    blocks=[]

    def save(m):
        blocks.append(m.group(0))
        return f'@@CODE_BLOCK_{len(blocks)-1}@@'

    # ```...```
    text=re.sub(r'```[\s\S]*?```',save,text)

    return text,blocks


def restore_code_blocks(text,blocks):
    for i,b in enumerate(blocks):
        text=text.replace(f'@@CODE_BLOCK_{i}@@',b)
    return text


def process(text):
    # 先保护代码块，避免把 C++ 里的内容误改
    text,blocks=protect_code_blocks(text)

    # 处理 $$...$$
    def repl_display(m):
        return '$$'+convert_math(m.group(1))+'$$'

    text=re.sub(r'\$\$([\s\S]*?)\$\$',repl_display,text)

    # 处理 \(...\)
    def repl_paren(m):
        return r'\('+convert_math(m.group(1))+r'\)'

    text=re.sub(r'\\\(([\s\S]*?)\\\)',repl_paren,text)

    # 处理 \[...\]
    def repl_bracket(m):
        return r'\['+convert_math(m.group(1))+r'\]'

    text=re.sub(r'\\\[([\s\S]*?)\\\]',repl_bracket,text)

    # 处理 $...$
    def repl_inline(m):
        return '$'+convert_math(m.group(1))+'$'

    text=re.sub(r'(?<!\$)\$([^\$\n]+)\$(?!\$)',repl_inline,text)

    # 恢复代码块
    text=restore_code_blocks(text,blocks)

    return text


def main():
    if len(sys.argv)<2:
        print('用法: python convert.py input.md [output.md]')
        return

    src=Path(sys.argv[1])

    if not src.exists():
        print(f'文件不存在: {src}')
        return

    text=src.read_text(encoding='utf-8')
    text=process(text)

    if len(sys.argv)>=3:
        out=Path(sys.argv[2])
    else:
        out=src.with_name(src.stem+'_mathjax'+src.suffix)

    out.write_text(text,encoding='utf-8')

    print(f'转换完成: {out}')


if __name__=='__main__':
    main()