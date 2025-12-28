import { useThemeStore } from "../../../store/ThemeStore";

export const BtnToggleTheme = () => {
    const {theme,setTheme} = useThemeStore();
  return (
    <button className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-primary/20 transition-all justify-center md:justify-start cursor-pointer" onClick={setTheme}>
      <span>{theme === "light" ? "☀️" : "🌑"}</span>
      <span className="hidden md:block">{theme === "light" ? "Claro" : "Oscuro"}</span>
    </button>
  );
};
