import React, { FC, useState } from "react";
import Link from "next/link";
import Tippy from "@tippyjs/react";
import { t } from "@lingui/macro";
import Language from "@mui/icons-material/Language";

import { locales } from "lib/i18n";

import * as styles from "./styles";
import { useRouter } from "next/router";

/**
 * Temporary demo component until we have one from design
 */
export const ChangeLanguageButton: FC = () => {
  const [showMenu, setShowMenu] = useState(false);
  const { locale } = useRouter();

  const labels = {
    en: "English",
    fr: "Français",
    "en-pseudo": "Pseudo",
  };

  const content = (
    <div className={styles.menuItemContainer}>
      {Object.keys(locales).map((localeKey) => (
        <Link
          key={localeKey}
          href="/"
          locale={localeKey}
          /** don't want to prefetch all locales */
          prefetch={false}
          replace={true}
        >
          <a
            data-active={locale == localeKey ? "true" : "false"}
            className={styles.menuItem}
          >
            {labels[localeKey as keyof typeof labels]}
          </a>
        </Link>
      ))}
    </div>
  );

  return (
    <Tippy
      className={styles.tooltip}
      content={content}
      interactive={true}
      onClickOutside={() => setShowMenu(false)}
      placement="bottom-end"
      visible={showMenu}
    >
      <button
        onClick={() => setShowMenu(!showMenu)}
        className={styles.changeLanguageButton}
        aria-label={t`Change language`}
      >
        <Language />
      </button>
    </Tippy>
  );
};
