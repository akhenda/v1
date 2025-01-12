'use client';

import Image from 'next/image';
import Link from 'next/link';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@v1/ui/dialog';

import { SubscribeForm } from './subscribe-form';

export function Header() {
  return (
    <header className="absolute top-0 z-10 flex w-full items-center justify-between p-4">
      <span className="hidden font-medium text-sm md:block">convex-v1.run</span>

      <Link href="/">
        <Image
          src="/logo.png"
          alt="V1 logo"
          width={60}
          quality={100}
          height={60}
          className="md:-translate-x-1/2 md:absolute md:top-5 md:left-1/2"
        />
      </Link>

      <nav className="md:mt-2">
        <ul className="flex items-center gap-4">
          <li>
            <a
              href={process.env.NEXT_PUBLIC_APP_URL}
              className="rounded-full bg-primary px-4 py-2 font-medium text-secondary text-sm"
            >
              Sign in
            </a>
          </li>
          <li>
            <a
              href="https://github.com/get-convex/v1"
              className="rounded-full bg-primary px-4 py-2 font-medium text-secondary text-sm"
            >
              Github
            </a>
          </li>
          <li>
            <Dialog>
              <DialogTrigger
                className="cursor-pointer rounded-full bg-secondary px-4 py-2 font-medium text-primary text-sm"
                asChild
              >
                <span>Get updates</span>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Stay updated</DialogTitle>
                  <DialogDescription>
                    Subscribe to our newsletter to get the latest news and updates.
                  </DialogDescription>
                </DialogHeader>

                <div className="flex flex-col gap-4">
                  <SubscribeForm group="v1-newsletter" placeholder="Email address" />
                </div>
              </DialogContent>
            </Dialog>
          </li>
        </ul>
      </nav>
    </header>
  );
}
