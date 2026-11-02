// Dev-only check for phase R0. Delete when R1 uses the real Key.
import { createRoot } from 'react-dom/client'
import '../src/index.css'
import Key, { IconKey } from '../src/components/ui/Key'

createRoot(document.getElementById('root')).render(
  <main className="flex min-h-svh flex-col gap-12 bg-ground px-4 py-12 wide:px-12">
    <h1 data-font="display" className="font-michroma text-[clamp(34px,4.6vw,66px)] leading-[1.06] text-ink">
      KEY TEST
    </h1>
    <p data-font="text" className="max-w-[440px] font-sans text-[15px] leading-[1.65] text-body">
      Press each key to check the inset state. Press Tab to check the focus ring.
    </p>

    <section className="grid grid-cols-2 gap-4 wide:flex">
      <Key href="#primary" variant="primary" icon="download">
        Primary
      </Key>
      <Key href="#normal">Normal</Key>
      <Key variant="primary" onClick={() => {}}>
        Button
      </Key>
      <Key onClick={() => {}}>Button</Key>
    </section>

    <section className="flex gap-7">
      <IconKey href="#github" icon="github" label="GitHub" />
      <IconKey href="#linkedin" icon="linkedin" label="LinkedIn" />
    </section>
  </main>
)
