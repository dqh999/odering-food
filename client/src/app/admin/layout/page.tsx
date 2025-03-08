"use client"

import { useState } from "react"
import { Save, LayoutGrid, Columns, Rows, ImageIcon, Undo } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function ShopLayoutPage() {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("general")

  const [layoutSettings, setLayoutSettings] = useState({
    general: {
      shopName: "Delicious Restaurant",
      tagline: "Fresh food, delivered to your table",
      description:
        "Our restaurant offers a wide variety of delicious dishes prepared with the freshest ingredients. Place your order online and enjoy a wonderful dining experience!",
      logo: "/placeholder.svg?height=100&width=100",
      primaryColor: "#3b82f6",
      secondaryColor: "#f3f4f6",
      accentColor: "#10b981",
    },
    homepage: {
      heroImage: "/placeholder.svg?height=400&width=800",
      heroTitle: "Welcome to Delicious Restaurant",
      heroSubtitle: "Experience the finest cuisine in town",
      featuredCategories: ["Appetizers", "Main Courses", "Desserts"],
      showFeaturedItems: true,
      showTestimonials: true,
    },
    menu: {
      layout: "grid",
      itemsPerRow: 3,
      showImages: true,
      showDescription: true,
      showAllergens: true,
      categoriesStyle: "tabs",
    },
    footer: {
      address: "123 Main Street, City, Country",
      phone: "+1 234 567 890",
      email: "info@deliciousrestaurant.com",
      showSocialLinks: true,
      facebook: "https://facebook.com",
      instagram: "https://instagram.com",
      twitter: "https://twitter.com",
    },
  })

  const handleSaveChanges = () => {
    toast({
      title: "Layout settings saved",
      description: "Your shop layout settings have been updated successfully.",
    })
  }

  const handleResetChanges = (section: keyof typeof layoutSettings) => {
    // In a real app, this would reset to the last saved state
    toast({
      title: "Changes reset",
      description: `${section.charAt(0).toUpperCase() + section.slice(1)} settings have been reset.`,
    })
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Shop Layout</h1>
          <p className="text-muted-foreground">Customize the appearance and layout of your restaurant website</p>
        </div>
        <Button onClick={handleSaveChanges} className="flex items-center gap-2">
          <Save className="h-4 w-4" />
          Save Changes
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="homepage">Homepage</TabsTrigger>
          <TabsTrigger value="menu">Menu Display</TabsTrigger>
          <TabsTrigger value="footer">Footer</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>Basic information about your restaurant</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="shopName">Restaurant Name</Label>
                  <Input
                    id="shopName"
                    value={layoutSettings.general.shopName}
                    onChange={(e) =>
                      setLayoutSettings({
                        ...layoutSettings,
                        general: {
                          ...layoutSettings.general,
                          shopName: e.target.value,
                        },
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tagline">Tagline</Label>
                  <Input
                    id="tagline"
                    value={layoutSettings.general.tagline}
                    onChange={(e) =>
                      setLayoutSettings({
                        ...layoutSettings,
                        general: {
                          ...layoutSettings.general,
                          tagline: e.target.value,
                        },
                      })
                    }
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={layoutSettings.general.description}
                  onChange={(e) =>
                    setLayoutSettings({
                      ...layoutSettings,
                      general: {
                        ...layoutSettings.general,
                        description: e.target.value,
                      },
                    })
                  }
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="logo">Logo URL</Label>
                <div className="flex gap-2">
                  <Input
                    id="logo"
                    value={layoutSettings.general.logo}
                    onChange={(e) =>
                      setLayoutSettings({
                        ...layoutSettings,
                        general: {
                          ...layoutSettings.general,
                          logo: e.target.value,
                        },
                      })
                    }
                  />
                  <Button variant="outline" size="icon">
                    <ImageIcon className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="primaryColor">Primary Color</Label>
                  <div className="flex gap-2">
                    <div
                      className="w-10 h-10 rounded border"
                      style={{ backgroundColor: layoutSettings.general.primaryColor }}
                    />
                    <Input
                      id="primaryColor"
                      value={layoutSettings.general.primaryColor}
                      onChange={(e) =>
                        setLayoutSettings({
                          ...layoutSettings,
                          general: {
                            ...layoutSettings.general,
                            primaryColor: e.target.value,
                          },
                        })
                      }
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="secondaryColor">Secondary Color</Label>
                  <div className="flex gap-2">
                    <div
                      className="w-10 h-10 rounded border"
                      style={{ backgroundColor: layoutSettings.general.secondaryColor }}
                    />
                    <Input
                      id="secondaryColor"
                      value={layoutSettings.general.secondaryColor}
                      onChange={(e) =>
                        setLayoutSettings({
                          ...layoutSettings,
                          general: {
                            ...layoutSettings.general,
                            secondaryColor: e.target.value,
                          },
                        })
                      }
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="accentColor">Accent Color</Label>
                  <div className="flex gap-2">
                    <div
                      className="w-10 h-10 rounded border"
                      style={{ backgroundColor: layoutSettings.general.accentColor }}
                    />
                    <Input
                      id="accentColor"
                      value={layoutSettings.general.accentColor}
                      onChange={(e) =>
                        setLayoutSettings({
                          ...layoutSettings,
                          general: {
                            ...layoutSettings.general,
                            accentColor: e.target.value,
                          },
                        })
                      }
                    />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="justify-between">
              <Button
                variant="outline"
                onClick={() => handleResetChanges("general")}
                className="flex items-center gap-2"
              >
                <Undo className="h-4 w-4" />
                Reset Changes
              </Button>
              <Button onClick={handleSaveChanges}>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="homepage">
          <Card>
            <CardHeader>
              <CardTitle>Homepage Layout</CardTitle>
              <CardDescription>Customize how your homepage appears to customers</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="heroImage">Hero Image URL</Label>
                <div className="flex gap-2">
                  <Input
                    id="heroImage"
                    value={layoutSettings.homepage.heroImage}
                    onChange={(e) =>
                      setLayoutSettings({
                        ...layoutSettings,
                        homepage: {
                          ...layoutSettings.homepage,
                          heroImage: e.target.value,
                        },
                      })
                    }
                  />
                  <Button variant="outline" size="icon">
                    <ImageIcon className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="heroTitle">Hero Title</Label>
                  <Input
                    id="heroTitle"
                    value={layoutSettings.homepage.heroTitle}
                    onChange={(e) =>
                      setLayoutSettings({
                        ...layoutSettings,
                        homepage: {
                          ...layoutSettings.homepage,
                          heroTitle: e.target.value,
                        },
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="heroSubtitle">Hero Subtitle</Label>
                  <Input
                    id="heroSubtitle"
                    value={layoutSettings.homepage.heroSubtitle}
                    onChange={(e) =>
                      setLayoutSettings({
                        ...layoutSettings,
                        homepage: {
                          ...layoutSettings.homepage,
                          heroSubtitle: e.target.value,
                        },
                      })
                    }
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="featuredCategories">Featured Categories</Label>
                <Select
                  value={layoutSettings.homepage.featuredCategories.join(",")}
                  onValueChange={(value) =>
                    setLayoutSettings({
                      ...layoutSettings,
                      homepage: {
                        ...layoutSettings.homepage,
                        featuredCategories: value ? value.split(",") : [],
                      },
                    })
                  }
                >
                  <SelectTrigger id="featuredCategories">
                    <SelectValue placeholder="Select categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Appetizers,Main Courses,Desserts">Appetizers, Main Courses, Desserts</SelectItem>
                    <SelectItem value="Appetizers,Main Courses">Appetizers, Main Courses</SelectItem>
                    <SelectItem value="Main Courses,Desserts">Main Courses, Desserts</SelectItem>
                    <SelectItem value="Appetizers,Desserts">Appetizers, Desserts</SelectItem>
                    <SelectItem value="Appetizers,Main Courses,Desserts,Drinks">All Categories</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="showFeaturedItems"
                    checked={layoutSettings.homepage.showFeaturedItems}
                    onChange={(e) =>
                      setLayoutSettings({
                        ...layoutSettings,
                        homepage: {
                          ...layoutSettings.homepage,
                          showFeaturedItems: e.target.checked,
                        },
                      })
                    }
                    className="h-4 w-4 rounded border-gray-300"
                  />
                  <Label htmlFor="showFeaturedItems">Show Featured Items</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="showTestimonials"
                    checked={layoutSettings.homepage.showTestimonials}
                    onChange={(e) =>
                      setLayoutSettings({
                        ...layoutSettings,
                        homepage: {
                          ...layoutSettings.homepage,
                          showTestimonials: e.target.checked,
                        },
                      })
                    }
                    className="h-4 w-4 rounded border-gray-300"
                  />
                  <Label htmlFor="showTestimonials">Show Testimonials</Label>
                </div>
              </div>
            </CardContent>
            <CardFooter className="justify-between">
              <Button
                variant="outline"
                onClick={() => handleResetChanges("homepage")}
                className="flex items-center gap-2"
              >
                <Undo className="h-4 w-4" />
                Reset Changes
              </Button>
              <Button onClick={handleSaveChanges}>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="menu">
          <Card>
            <CardHeader>
              <CardTitle>Menu Display Settings</CardTitle>
              <CardDescription>Configure how menu items are displayed to customers</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="menuLayout">Menu Layout</Label>
                  <Select
                    value={layoutSettings.menu.layout}
                    onValueChange={(value: any) =>
                      setLayoutSettings({
                        ...layoutSettings,
                        menu: {
                          ...layoutSettings.menu,
                          layout: value,
                        },
                      })
                    }
                  >
                    <SelectTrigger id="menuLayout" className="flex items-center gap-2">
                      <SelectValue placeholder="Select layout" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="grid">
                        <div className="flex items-center gap-2">
                          <LayoutGrid className="h-4 w-4" />
                          <span>Grid</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="list">
                        <div className="flex items-center gap-2">
                          <Rows className="h-4 w-4" />
                          <span>List</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="columns">
                        <div className="flex items-center gap-2">
                          <Columns className="h-4 w-4" />
                          <span>Columns</span>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="itemsPerRow">Items Per Row</Label>
                  <Select
                    value={layoutSettings.menu.itemsPerRow.toString()}
                    onValueChange={(value) =>
                      setLayoutSettings({
                        ...layoutSettings,
                        menu: {
                          ...layoutSettings.menu,
                          itemsPerRow: Number.parseInt(value),
                        },
                      })
                    }
                  >
                    <SelectTrigger id="itemsPerRow">
                      <SelectValue placeholder="Select number" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2">2 items</SelectItem>
                      <SelectItem value="3">3 items</SelectItem>
                      <SelectItem value="4">4 items</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="showImages"
                    checked={layoutSettings.menu.showImages}
                    onChange={(e) =>
                      setLayoutSettings({
                        ...layoutSettings,
                        menu: {
                          ...layoutSettings.menu,
                          showImages: e.target.checked,
                        },
                      })
                    }
                    className="h-4 w-4 rounded border-gray-300"
                  />
                  <Label htmlFor="showImages">Show Images</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="showDescription"
                    checked={layoutSettings.menu.showDescription}
                    onChange={(e) =>
                      setLayoutSettings({
                        ...layoutSettings,
                        menu: {
                          ...layoutSettings.menu,
                          showDescription: e.target.checked,
                        },
                      })
                    }
                    className="h-4 w-4 rounded border-gray-300"
                  />
                  <Label htmlFor="showDescription">Show Description</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="showAllergens"
                    checked={layoutSettings.menu.showAllergens}
                    onChange={(e) =>
                      setLayoutSettings({
                        ...layoutSettings,
                        menu: {
                          ...layoutSettings.menu,
                          showAllergens: e.target.checked,
                        },
                      })
                    }
                    className="h-4 w-4 rounded border-gray-300"
                  />
                  <Label htmlFor="showAllergens">Show Allergens</Label>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="categoriesStyle">Categories Display Style</Label>
                <Select
                  value={layoutSettings.menu.categoriesStyle}
                  onValueChange={(value: any) =>
                    setLayoutSettings({
                      ...layoutSettings,
                      menu: {
                        ...layoutSettings.menu,
                        categoriesStyle: value,
                      },
                    })
                  }
                >
                  <SelectTrigger id="categoriesStyle">
                    <SelectValue placeholder="Select style" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tabs">Tabs</SelectItem>
                    <SelectItem value="sections">Scrollable Sections</SelectItem>
                    <SelectItem value="dropdown">Dropdown Menu</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter className="justify-between">
              <Button variant="outline" onClick={() => handleResetChanges("menu")} className="flex items-center gap-2">
                <Undo className="h-4 w-4" />
                Reset Changes
              </Button>
              <Button onClick={handleSaveChanges}>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="footer">
          <Card>
            <CardHeader>
              <CardTitle>Footer Information</CardTitle>
              <CardDescription>Configure contact information and social links</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Textarea
                  id="address"
                  value={layoutSettings.footer.address}
                  onChange={(e) =>
                    setLayoutSettings({
                      ...layoutSettings,
                      footer: {
                        ...layoutSettings.footer,
                        address: e.target.value,
                      },
                    })
                  }
                  rows={2}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={layoutSettings.footer.phone}
                    onChange={(e) =>
                      setLayoutSettings({
                        ...layoutSettings,
                        footer: {
                          ...layoutSettings.footer,
                          phone: e.target.value,
                        },
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    value={layoutSettings.footer.email}
                    onChange={(e) =>
                      setLayoutSettings({
                        ...layoutSettings,
                        footer: {
                          ...layoutSettings.footer,
                          email: e.target.value,
                        },
                      })
                    }
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="showSocialLinks"
                    checked={layoutSettings.footer.showSocialLinks}
                    onChange={(e) =>
                      setLayoutSettings({
                        ...layoutSettings,
                        footer: {
                          ...layoutSettings.footer,
                          showSocialLinks: e.target.checked,
                        },
                      })
                    }
                    className="h-4 w-4 rounded border-gray-300"
                  />
                  <Label htmlFor="showSocialLinks">Show Social Media Links</Label>
                </div>

                {layoutSettings.footer.showSocialLinks && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pl-6">
                    <div className="space-y-2">
                      <Label htmlFor="facebook">Facebook URL</Label>
                      <Input
                        id="facebook"
                        value={layoutSettings.footer.facebook}
                        onChange={(e) =>
                          setLayoutSettings({
                            ...layoutSettings,
                            footer: {
                              ...layoutSettings.footer,
                              facebook: e.target.value,
                            },
                          })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="instagram">Instagram URL</Label>
                      <Input
                        id="instagram"
                        value={layoutSettings.footer.instagram}
                        onChange={(e) =>
                          setLayoutSettings({
                            ...layoutSettings,
                            footer: {
                              ...layoutSettings.footer,
                              instagram: e.target.value,
                            },
                          })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="twitter">Twitter URL</Label>
                      <Input
                        id="twitter"
                        value={layoutSettings.footer.twitter}
                        onChange={(e) =>
                          setLayoutSettings({
                            ...layoutSettings,
                            footer: {
                              ...layoutSettings.footer,
                              twitter: e.target.value,
                            },
                          })
                        }
                      />
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter className="justify-between">
              <Button
                variant="outline"
                onClick={() => handleResetChanges("footer")}
                className="flex items-center gap-2"
              >
                <Undo className="h-4 w-4" />
                Reset Changes
              </Button>
              <Button onClick={handleSaveChanges}>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

