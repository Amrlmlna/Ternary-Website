import {
  RefreshCw,
  Sparkles,
  Zap,
  Shield,
  Palette,
  AlertTriangle,
} from "lucide-react";

export const v_1_2_0_beta = {
  id: "1.2.0-beta",
  title: "1.2.0-beta",
  icon: <RefreshCw className="w-4 h-4" />,
  content: {
    title: "Release 1.2.0-beta",
    description:
      "Major feature release introducing templates, workflow improvements, and enhanced user experience.",
    items: [
      {
        title: "Feature Demo",
        content: (
          <div className="space-y-6">
            <div className="neu-box p-6">
              <div className="mt-6 text-center space-y-3">
                <div className="inline-flex items-center gap-2 px-4 py-2 neu-box text-sm font-medium">
                  <Sparkles className="w-4 h-4 text-accent" />
                  <span>
                    Automated workflow features - one prompt and you're good to
                    go
                  </span>
                </div>
                <p className="text-muted-foreground text-sm">
                  Interactive demo showcasing the new template system and
                  workflow improvements
                </p>
              </div>
            </div>
          </div>
        ),
      },
      {
        title: "Main Upgrades",
        content: (
          <div className="space-y-4">
            <div className="p-4 neu-radius neu-bg neu-shadow-inset">
              <h4 className="font-semibold mb-2">Template Features</h4>
              <p className="leading-relaxed opacity-80">
                Introducing two types of templates - Official templates with
                basic starter projects for Vite and Next.js, and Community
                templates supporting seamless sharing via 'Publish to Community'
                and 'Use Community Template' features
              </p>
              <div className="mt-4 neu-box p-4">
                <div className="relative w-full rounded-xl overflow-hidden">
                  <div
                    style={{
                      position: "relative",
                      boxSizing: "content-box",
                      width: "100%",
                      aspectRatio: "16 / 9",
                    }}
                  >
                    <iframe
                      src="https://app.supademo.com/embed/cmeajwv4z00cxxn0ietpahdoe?embed_v=2&utm_source=embed"
                      loading="lazy"
                      title="Ternary 1.2.0-beta Feature Demo"
                      allow="clipboard-write"
                      frameBorder={0}
                      allowFullScreen
                      className="absolute inset-0 w-full h-full rounded-lg"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="p-4 neu-radius neu-bg neu-shadow-inset">
              <h4 className="font-semibold mb-2">New Workflow Feature</h4>
              <p className="leading-relaxed opacity-80">
                Enhanced UI for more user-friendly experience
              </p>
              <div className="mt-4 neu-box p-4">
                <div className="relative w-full rounded-xl overflow-hidden">
                  <div
                    style={{
                      position: "relative",
                      boxSizing: "content-box",
                      width: "100%",
                      aspectRatio: "16 / 9",
                    }}
                  >
                    <iframe
                      src="https://app.supademo.com/embed/cmebmcw2300q9zo0i1axrrzjf?embed_v=2&utm_source=embed"
                      loading="lazy"
                      title="New Workflow Feature Demo"
                      allow="clipboard-write"
                      frameBorder={0}
                      allowFullScreen
                      className="absolute inset-0 w-full h-full rounded-lg"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="p-4 neu-radius neu-bg neu-shadow-inset">
              <h4 className="font-semibold mb-2">Auto Fix Problem</h4>
              <p className="leading-relaxed opacity-80">
                Intelligent error resolution to save credits
              </p>
              <div className="mt-4 neu-box p-4">
                <div className="relative w-full rounded-xl overflow-hidden">
                  <div
                    style={{
                      position: "relative",
                      boxSizing: "content-box",
                      width: "100%",
                      aspectRatio: "16 / 9",
                    }}
                  >
                    <iframe
                      src="https://app.supademo.com/embed/cmebmmcun04nxyj0jrfjmks4e?embed_v=2&utm_source=embed"
                      loading="lazy"
                      title="Auto Fix Problem Demo"
                      allow="clipboard-write"
                      frameBorder={0}
                      allowFullScreen
                      className="absolute inset-0 w-full h-full rounded-lg"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="p-4 neu-radius neu-bg neu-shadow-inset">
              <h4 className="font-semibold mb-2">Performance Optimization</h4>
              <p className="leading-relaxed opacity-80">
                Native Git integration for improved performance
              </p>
            </div>
          </div>
        ),
      },
      {
        title: "Additional Improvements",
        content: (
          <div className="space-y-3">
            {[
              {
                title: "Error Handling",
                description:
                  "Short-term mitigation for error invoking issues with clear restart instructions",
              },
              {
                title: "Clean Chat",
                description:
                  "Intelligent parsing of pasted errors to keep chat messages organized",
              },
              {
                title: "Design Panel Prototype",
                description:
                  "New drag-and-drop design panel for seamless app customization",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="flex items-start space-x-3 p-3 neu-radius neu-bg neu-shadow"
              >
                <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0 bg-[var(--neu-border)]"></div>
                <div>
                  <h5 className="font-medium">{item.title}</h5>
                  <p className="text-sm mt-1 opacity-80">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        ),
      },
      {
        title: "User Experience",
        content: (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 neu-radius neu-bg neu-shadow">
              <h5 className="font-semibold text-gray-900 dark:text-white mb-2">
                Template System
              </h5>
              <p className="text-sm opacity-80">
                Seamless template modification and sharing
              </p>
            </div>
            <div className="p-4 neu-radius neu-bg neu-shadow">
              <h5 className="font-semibold text-gray-900 dark:text-white mb-2">
                Workflow
              </h5>
              <p className="text-sm opacity-80">Improved workflow navigation</p>
            </div>
            <div className="p-4 neu-radius neu-bg neu-shadow">
              <h5 className="font-semibold text-gray-900 dark:text-white mb-2">
                Error Recovery
              </h5>
              <p className="text-sm opacity-80">
                Enhanced error recovery system
              </p>
            </div>
            <div className="p-4 neu-radius neu-bg neu-shadow">
              <h5 className="font-semibold text-gray-900 dark:text-white mb-2">
                Design Tools
              </h5>
              <p className="text-sm opacity-80">
                Interactive design capabilities
              </p>
            </div>
          </div>
        ),
      },
      {
        title: "Beta Notes",
        content: (
          <div className="p-6 neu-radius neu-bg neu-shadow border-l-4 border-[var(--neu-border)]">
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-[var(--neu-border)] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-xs font-bold">β</span>
              </div>
              <div>
                <h5 className="font-semibold mb-2">Beta Release Notice</h5>
                <p className="leading-relaxed opacity-80">
                  This is a beta release with significant new features. Please
                  report any issues you encounter to help us stabilize for the
                  final 1.2.0 release. Template and workflow features are in
                  active development.
                </p>
              </div>
            </div>
          </div>
        ),
      },
    ],
  },
} as const;
