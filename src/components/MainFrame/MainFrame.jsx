import FileInput from "../FileInput/FileInput";
import { motion } from "framer-motion";

function MainFrame() {
  return (
    <div className="relative flex flex-col max-h-full overflow-hidden overflow-x-hidden isolate">
      <div className="px-6 pt-10 pb-24 mx-auto sm:pb-32 lg:flex lg:px-8 lg:py-40">
        <div className="flex-shrink-0 max-w-2xl mx-0 text-left lg:mx-0 lg:max-w-xl lg:pt-8">
          <motion.h1
            className="mt-10 text-4xl font-bold tracking-tight select-none text-slate-100 transform-gpu sm:text-6xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.1 }}
          >
            De <span className="gradient-text">HTML</span> para{" "}
            <span className="gradient-text">Markdown</span> em segundos
          </motion.h1>
          <motion.p
            className="mt-6 text-lg leading-8 select-none text-slate-300 transform-gpu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            Transforme rapidamente a documentação gerada pelo Power BI Helper de
            formato HTML para Markdown, facilitando a organização,
            compartilhamento e leitura das informações do seu projeto Power BI.
          </motion.p>
          <motion.div
            className="flex items-center mt-10 transform-gpu gap-x-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            <FileInput />
          </motion.div>
          <motion.p
            className="mt-2 text-sm font-semibold text-right transition-colors duration-300 cursor-pointer select-none transform-gpu text-slate-50 hover:text-sky-200"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 2 }}
          >
            Continuar de onde eu parei <span aria-hidden="true">&rarr;</span>
          </motion.p>
        </div>

        <div className="flex max-w-2xl mx-auto mt-16 sm:mt-24 lg:ml-10 lg:mr-0 lg:mt-0 lg:max-w-none lg:flex-none xl:ml-32">
          <motion.div
            className="flex-none max-w-3xl transform-gpu sm:max-w-5xl lg:max-w-none"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <img
              src="https://tailwindui.com/img/component-images/dark-project-app-screenshot.png"
              alt="App screenshot"
              width={2432}
              height={1442}
              className="w-[76rem] rounded-md bg-white/5 shadow-2xl ring-1 ring-white/10 select-none"
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default MainFrame;
