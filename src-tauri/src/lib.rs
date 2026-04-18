use tauri::menu::{MenuBuilder, SubmenuBuilder};

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
  tauri::Builder::default()
    .setup(|app| {
      if cfg!(debug_assertions) {
        app.handle().plugin(
          tauri_plugin_log::Builder::default()
            .level(log::LevelFilter::Info)
            .build(),
        )?;
      }

      // Build native menu with Edit submenu for copy/paste/undo
      let edit_menu = SubmenuBuilder::new(app, "Edit")
        .undo()
        .redo()
        .separator()
        .cut()
        .copy()
        .paste()
        .select_all()
        .build()?;

      let window_menu = SubmenuBuilder::new(app, "Window")
        .minimize()
        .close_window()
        .separator()
        .fullscreen()
        .build()?;

      let menu = MenuBuilder::new(app)
        .item(&edit_menu)
        .item(&window_menu)
        .build()?;

      app.set_menu(menu)?;

      Ok(())
    })
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
